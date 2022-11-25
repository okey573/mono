import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import './SingleResult.scss'

type Result = Mix.Result

const SingleResult = defineComponent({
  props: {
    result: {
      type: Object as PropType<Result>,
      required: true
    },
  },
  setup(props) {
    const result = props.result
    return () => <div class="single-result">
      <el-input
        class="single-result-cell"
        input-style={{'text-align': 'center'}}
        controls={false}
        v-model={result.title}
      />

      <el-input-number
        class="single-result-cell"
        controls={false}
        v-model={result.odds}
      />
    </div>
  }
})

export default SingleResult
