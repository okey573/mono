import { defineComponent, ref, watch } from 'vue'

import './index.scss'
import Games from '@/views/odds/Calculator/components/Games'

function cartesian(games: Array<Array<SingleGameResult>>): Array<Array<SingleGameResult>> {
  return games.reduce((previous, current) => {
    let result: Array<Array<SingleGameResult>> = []
    current.forEach(c => {
      if (previous.length) {
        previous.forEach(a => {
          result.push(a.concat(c))
        })
      } else {
        result.push([c])
      }
    })
    return result as Array<Array<SingleGameResult>>
  }, [] as Array<Array<SingleGameResult>>)
}

const Calculator = defineComponent({
  setup() {
    // TODO 怎么声明类型
    const gamesRef = ref()
    const gameColumn = ref<Array<Game>>([])
    const result = ref<Array<GameResult>>([])
    const doCalculator = (games: Array<Game>) => {
      gameColumn.value = games
      const products = cartesian(games.map(item => [
        { result: `${item.home}胜`, odds: item.win, game: `${item.home} vs ${item.guest}` } as SingleGameResult,
        { result: `${item.home}平`, odds: item.draw, game: `${item.home} vs ${item.guest}` } as SingleGameResult,
        { result: `${item.home}负`, odds: item.lose, game: `${item.home} vs ${item.guest}` } as SingleGameResult,
      ]))

      result.value = products.map(product => {
        const bonus: number = product.reduce((previousValue, currentValue) => previousValue * currentValue.odds, 1) * 2
        const principal = products.length * 2
        const result: GameResult = {
          bonus,
          profit: bonus - principal
        }
        product.forEach((value, index) => {
          // @ts-ignore
          result[`game${index + 1}`] = value.result
        })
        return result
      })
    }

    return () => <div class="calculator">
      <Games ref={gamesRef} />

      <el-button type="primary" onClick={() => doCalculator(gamesRef.value?.games)} class="calculator-btn">
        计 算
      </el-button>

      <div class="overview">
        总计{result.value.length}种结果，{result.value.filter(i => i.profit > 0).length}种盈利，{result.value.filter(i => i.profit < 0).length}种盈亏
      </div>


      <el-table data={result.value} border class="result-table">
        {
          gameColumn.value.map((item, index) =>
            <el-table-column
              prop={`game${index + 1}`} label={`${item.home} vs ${item.guest}`}
              width="180"
              align="center"
            />)
        }
        <el-table-column
          label="奖金"
          width="180"
          align="center"
          formatter={(row: GameResult) => row.bonus.toFixed(2)} />
        <el-table-column
          label="盈亏"
          width="180"
          align="center"
          v-slots={{
            default: (scope: any) => <span style={{color: scope.row.profit > 0 ? 'red' : 'green'}}>{scope.row.profit.toFixed(2)}</span>
          }}
        >
        </el-table-column>
      </el-table>
    </div>
  }
})

export default Calculator
