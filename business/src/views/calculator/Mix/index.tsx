import { computed, defineComponent, ref, watch } from 'vue'

import { cartesian } from '@/views/calculator/utils'
import './index.scss'
import Games from '@/views/calculator/Mix/components/Games'

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

const Tie = defineComponent({
  setup() {
    const type = ref<string>('')
    const gamesColumns = ref<Array<Column>>([])
    const result = ref<Array<Row>>([])

    const total = computed(() => {
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
    })

    const calculate = (games: Array<Game>) => {
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
    }

    return () => <div class="mix">
      <div class="types">
        <el-radio-group v-model={type.value}>
          <el-radio label="胜负平">胜负平</el-radio>
          <el-radio label="让球">让球</el-radio>
          <el-radio label="比分">比分</el-radio>
          <el-radio label="总进球">总进球</el-radio>
          <el-radio label="半全场">半全场</el-radio>
          <el-radio label="混合">混合</el-radio>
        </el-radio-group>
      </div>
      <Games onCalculate={calculate} />
      {
        total.value > 0
          ?
          <div class="overview">
            <span class="bold">{gamesColumns.value.length}</span>场比赛<span class="bold">{type.value}</span>类买法{gamesColumns.value.length}串1：
            <br />
            总计<span class="bold">{total.value}</span>种组合结果，选择了<span class="bold">{result.value.length}</span>种组合，购买1倍需要花费<span class="bold">{2 * result.value.length}</span>元
            <br />
            中奖的概率为<span class="bold">{((result.value.length / total.value) * 100).toFixed(2)}%</span>，其中：
            <span class="bold">{result.value.filter(i => i.profit > 0).length}</span>种盈利，<span class="bold">{result.value.filter(i => i.profit < 0).length}</span>种盈亏
            <br />
            盈利的概率为<span class="bold">{((result.value.filter(i => i.profit > 0).length / total.value) * 100).toFixed(2)}%</span>
          </div>
          :
          <div class="overview">
            混合玩法计算不了总组合数
            <span class="bold">{gamesColumns.value.length}</span>场比赛{gamesColumns.value.length}串1：
            <br />
            选择了<span class="bold">{result.value.length}</span>种组合，购买1倍需要花费<span class="bold">{2 * result.value.length}</span>元
            <br />
            其中：
            <span class="bold">{result.value.filter(i => i.profit > 0).length}</span>种盈利，<span class="bold">{result.value.filter(i => i.profit < 0).length}</span>种盈亏
            <br />
            亏盈比例为{'=>'} <span class="bold">1 : {(result.value.filter(i => i.profit > 0).length / result.value.filter(i => i.profit > 0).length).toFixed(2)}</span>
          </div>
      }
      <el-table data={result.value} border class="result-table">
        {
          gamesColumns.value.map((item, index) =>
            <el-table-column
              label={item.label}
              prop={item.prop}
              width="180"
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
  }
})

export default Tie
