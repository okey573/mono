import { defineComponent, reactive } from 'vue'

import './Games.scss'
import SingleGame from '@/views/calculator/Mix/components/SingleGame'

type Game = Mix.Game

const Games = defineComponent({
  name: 'Games',
  // TODO emits怎么添加类型
  emits: ['calculate'],

  setup(props, { emit }) {
    const games = reactive<Array<Game>>([])

    const addGame = () => {
      games.push({
        home: '',
        guest: '',
        results: []
      })
    }

    const start = () => {
      emit('calculate', games)
    }

    return () => <div class="games">
      {
        games.map(game => <>
          <SingleGame game={game} />
          <hr/>
        </>)
      }
      <div class="buttons">
        <el-button class="add-button" type="primary" onClick={addGame}> 添加比赛</el-button>
        <el-button class="calculate-button" type="success" onClick={start}> 计算结果</el-button>
      </div>
    </div>
  }
})

export default Games
