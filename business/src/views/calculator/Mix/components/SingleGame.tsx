import type { PropType } from 'vue'
import { Plus, CloseBold } from '@element-plus/icons-vue'

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
  emits: ['deleteGame'],
  setup(props, { emit }) {
    const game = props.game
    const addResult = () => {
      game.results.push({
        title: undefined,
        odds: undefined
      } as unknown as Result)
    }
    const deleteGame = () => {
      emit('deleteGame')
    }
    return () => <div class="single-game">
      <div class="head-column">
        <el-popconfirm
          title="确认删除吗？"
          onConfirm={deleteGame}
          v-slots={{
          reference: () => <el-button class="del-btn" icon={CloseBold} circle />
        }}>
      </el-popconfirm>

        <el-input placeholder="输入主场" v-model={game.home} input-style={{ 'text-align': 'center' }} />
        <span class="vs_flag"> vs </span>
        <el-input placeholder="输入客场" v-model={game.guest} input-style={{ 'text-align': 'center' }} />
        <span class="vs_flag">：</span>
      </div>
      {
        game.results.map((result: Result) => <SingleResult result={result} />)
      }
      <div class="tail-column">
        <el-button icon={Plus} circle onClick={addResult} />
      </div>
    </div>
  }
})

export default SingleGame
