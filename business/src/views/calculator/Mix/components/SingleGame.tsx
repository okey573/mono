import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import SingleResult from '@/views/calculator/Mix/components/SingleResult'
import './SingleGame.scss'

type Game = Mix.Game
type Result = Mix.Result

const SingleGame = defineComponent({
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  },
  setup(props) {
    const game = props.game
    const addResult = () => {
      game.results.push({
        title: undefined,
        odds: undefined
      } as unknown as Result)
    }
    return () => <div class="single-game">
      <div class="head-column">
        <el-input v-model={game.home} input-style={{'text-align': 'center'}} />
        <span> vs </span>
        <el-input v-model={game.guest} input-style={{'text-align': 'center'}} />
      </div>
      {
        game.results.map(result => <SingleResult result={result} />)
      }
      <div class="tail-column">
        <el-button icon={Plus} circle onClick={addResult}/>
      </div>
    </div>
  }
})

export default SingleGame
