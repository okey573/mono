// import { mock, Random } from 'mockjs'

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
      // games.push(mock({
      //   home: Random.cword(2, 5),
      //   guest: Random.cword(2, 5),
      //   'results|2-4': [{
      //     title: () => Random.string(2, 4),
      //     odds: () => Random.float(1, 10, 0, 2)
      //   }]
      // }))
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
