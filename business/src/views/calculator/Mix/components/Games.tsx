import { defineComponent, reactive } from 'vue'

import './Games.scss'
import SingleGame from '@/views/calculator/Mix/components/SingleGame'

type Game = Mix.Game

const Games = defineComponent({
  name: 'Games',
  // TODO emits怎么添加类型
  emits: ['calculate'],

  setup(props, { emit, expose }) {
    const games = reactive<Array<Game>>([])

    const addGame = () => {
      games.push({
        home: '',
        guest: '',
        results: []
      })
    }

    const deleteGame = (index: number) => {
      games.splice(index, 1)
    }

    expose({
      games,
      addGame
    })

    return () => <div class="games">
      {
        games.map((game, index) => <>
          <SingleGame key={Symbol(index)} game={game} onDeleteGame={() => deleteGame(index)} />
        </>)
      }
    </div>
  }
})

export default Games
