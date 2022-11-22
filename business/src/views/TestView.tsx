import { defineComponent } from 'vue'
import { delay, version } from '@okey573/awesome-fe-utils'

export default defineComponent({
  setup() {
    const testFn = async () => {
      await delay(300)
      console.log(`utils version => ${ version }`)
    }

    return () => <>
      <button onClick={ testFn }>test button</button>
    </>
  }
})
