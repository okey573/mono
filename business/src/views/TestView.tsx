import { defineComponent, reactive, watch } from 'vue'
import { delay, version } from '@okey573/awesome-fe-utils'

export default defineComponent({
  setup() {

    const obj = reactive({
      a1: {
        b1: 'haha'
      }
    })

    watch(() => obj.a1, (value, oldValue) => {
      console.log('watched')
      console.log(value === oldValue)
      console.log(value)
      console.log(oldValue)
    }, { deep: true })

    const testFn = async () => {
      await delay(300)
      console.log(`utils version => ${ version }`)
      obj.a1 = { b1: 'test' }
    }

    return () => <>
      <el-button onClick={ testFn }>I am test button</el-button>
    </>
  }
})
