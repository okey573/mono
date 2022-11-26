import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'


import { cartesian } from '@/views/calculator/utils'
import './index.scss'
import Games from '@/views/calculator/Mix/components/Games'
import BoldSpan from '@/components/BoldSpan'
import { percentage } from '@/utils'

type Game = Mix.Game

interface ResultRow {
  title: string,
  odds: number
  game: Omit<Game, 'results'>
}

type Column = {
  label: string,
  prop: string
}
type Row = {
  bonus: number,
  profit: number,
  [key: string]: string | number
}
type Status = Partial<{
  gameType: string
  // 比赛场数
  gamesLength: number,
  // 全部的组合数
  entireCombinations: number,
  // 所选的组合数
  checkedCombinations: number,
  // 1倍花费
  cost: number,
  // 中奖概率
  winPrizeRatio: string,
  // 盈利组合数
  profitCombinations: number,
  // 亏损组合数
  lossCombinations: number,
  // 盈利概率
  profitRatio: string,
  // 盈亏比例
  profitRatioLoss: string
}>

const Tie = defineComponent({
  setup() {
    const gameRef = ref()
    const type = ref<string>('')
    const gamesColumns = ref<Array<Column>>([])
    const result = ref<Array<Row>>([])
    const statusOverview = ref<Status>({})

    const addGame = () => {
      gameRef.value.addGame()
    }
    const calculate = () => {
      // check
      if (!type.value) {
        ElMessage.error({
          message: '请选择左侧的游戏种类',
          duration: 1000
        })
        return
      }
      // TODO 使用我的克隆方法
      const games: Array<Game> = (JSON.parse(JSON.stringify(gameRef.value.games)) as Array<Game>).map(game => {
        const filteredGame = {
          home: game.home,
          guest: game.guest,
          results: game.results.filter(result => result.title && (result.odds || result.odds === 0))
        }
        if (!filteredGame.home || !filteredGame.guest || !filteredGame.results || !filteredGame.results.length) {
          return undefined
        } else {
          return filteredGame
        }
      }).filter(Boolean) as Array<Game>
      if (!games.length) {
        ElMessage.error({
          message: '请添加比赛',
          duration: 1000
        })
        return
      }

      gamesColumns.value = games.map((item, index) => {
        return {
          label: `${item.home}（主） vs ${item.guest}（客）`,
          prop: `game${index + 1}`
        }
      })

      const products = cartesian(games.map(game => {
        return game.results.map(result => {
          return {
            title: result.title,
            odds: result.odds,
            game: {
              home: game.home,
              guest: game.guest,
            }
          }
        })
      })) as Array<Array<ResultRow>>

      result.value = products.map(product => {
        const bonus: number = product.reduce((previousValue, currentValue) => previousValue * currentValue.odds, 1) * 2
        const principal = products.length * 2
        const result: Row = {
          bonus,
          profit: bonus - principal
        }
        product.forEach((value, index) => {
          // @ts-ignore
          result[`game${index + 1}`] = value.title
        })
        return result
      })

      // 计算overview status
      const gameType = type.value
      // 比赛场数
      const gamesLength = gamesColumns.value.length
      // 全部的组合数
      const entireCombinations = (() => {
        let base: number = 0
        switch (type.value) {
          case '胜负平':
            base = 3
            break
          case '让球':
            base = 3
            break
          case '比分':
            base = 21
            break
          case '总进球':
            base = 10
            break
          case '半全场':
            base = 9
            break
          case '混合':
            base = 0
            break
        }
        return Math.pow(base, gamesColumns.value.length)
      })()
      // 所选的组合数
      const checkedCombinations = result.value.length
      // 1倍花费
      const cost = checkedCombinations * 2
      // 中奖概率
      const winPrizeRatio = percentage(checkedCombinations / entireCombinations)
      // 盈利组合数
      const profitCombinations = result.value.filter(i => i.profit > 0).length
      // 亏损组合数
      const lossCombinations = result.value.filter(i => i.profit < 0).length
      // 盈利概率
      const profitRatio = percentage(profitCombinations / entireCombinations)
      // 盈亏比例
      const profitRatioLoss = `1 : ${Number((lossCombinations / profitCombinations).toFixed(2))}`
      statusOverview.value = {
        gameType,
        gamesLength,
        entireCombinations,
        checkedCombinations,
        cost,
        winPrizeRatio,
        profitCombinations,
        lossCombinations,
        profitRatio,
        profitRatioLoss
      } as Status
    }

    return () => <div class="mix">
      <div class="game-types">
        <el-radio-group v-model={type.value} class="game-types-radio-group">
          <el-radio class="game-types-radio" label="胜负平">胜负平</el-radio>
          <el-radio class="game-types-radio" label="让球">让球</el-radio>
          <el-radio class="game-types-radio" label="比分">比分</el-radio>
          <el-radio class="game-types-radio" label="总进球">总进球</el-radio>
          <el-radio class="game-types-radio" label="半全场">半全场</el-radio>
          <el-radio class="game-types-radio" label="混合">混合</el-radio>
        </el-radio-group>
      </div>
      <div class="page-content">
        <div class="page-content__toolbar">
          <el-button class="add-button" type="primary" onClick={addGame}> 添加比赛</el-button>
          <el-button class="calculate-button" type="success" onClick={calculate}> 计算结果</el-button>
        </div>
        <div class="page-content__content">
          <Games ref={gameRef} />
          <el-table data={result.value} border class="result-table">
            {
              gamesColumns.value.map((item, index) =>
                <el-table-column
                  label={item.label}
                  prop={item.prop}
                  min-width="200"
                  align="center"
                />)
            }
            <el-table-column
              label="奖金"
              width="180"
              align="center"
              formatter={(row: Row) => row.bonus.toFixed(2)} />
            <el-table-column
              label="盈亏"
              width="180"
              align="center"
              v-slots={{
                default: (scope: any) =>
                  <span style={{ color: scope.row.profit > 0 ? 'red' : 'green' }}>{scope.row.profit.toFixed(2)}</span>
              }}
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="page-content__status">
          {
            statusOverview.value.gamesLength! > 0
              ?
              statusOverview.value.entireCombinations! > 0
                ?
                <div class="overview">
                  <BoldSpan v-slots={{ default: () => statusOverview.value.gamesLength }} />场比赛
                  <BoldSpan v-slots={{ default: () => statusOverview.value.gameType }} />类买法
                  {statusOverview.value.gamesLength}串1：
                  <br />

                  总计<BoldSpan v-slots={{ default: () => statusOverview.value.entireCombinations }} />种组合结果，
                  选择了<BoldSpan v-slots={{ default: () => statusOverview.value.checkedCombinations }} />种组合，
                  购买1倍需要花费<BoldSpan v-slots={{ default: () => statusOverview.value.cost }} />元
                  <br />

                  中奖的概率为<BoldSpan v-slots={{ default: () => statusOverview.value.winPrizeRatio }} />，其中：
                  <BoldSpan v-slots={{ default: () => statusOverview.value.profitCombinations }} />种盈利，
                  <BoldSpan v-slots={{ default: () => statusOverview.value.lossCombinations }} />种盈亏
                  <br />

                  盈利的概率为<BoldSpan v-slots={{ default: () => statusOverview.value.profitRatio }} />
                </div>
                :
                <div class="overview">
                  <BoldSpan v-slots={{ default: () => statusOverview.value.gamesLength }} />场比赛
                  <BoldSpan v-slots={{ default: () => statusOverview.value.gameType }}></BoldSpan>类买法
                  {statusOverview.value.gamesLength}串1：
                  <br />

                  选择了<BoldSpan v-slots={{ default: () => statusOverview.value.checkedCombinations }} />种组合，
                  购买1倍需要花费<BoldSpan v-slots={{ default: () => statusOverview.value.cost }} />元
                  <br />

                  其中：
                  <BoldSpan v-slots={{ default: () => statusOverview.value.profitCombinations }} />种盈利，
                  <BoldSpan v-slots={{ default: () => statusOverview.value.lossCombinations }} />种盈亏
                  <br />

                  亏盈比例为<BoldSpan v-slots={{ default: () => statusOverview.value.profitRatioLoss }} />
                </div>
              :
              <div>选择种类，添加比赛后开始计算....</div>
          }
        </div>
      </div>
    </div>
  }
})

export default Tie
