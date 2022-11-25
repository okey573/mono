import { defineComponent } from 'vue'

const BoldSpan = defineComponent({
  name: 'BoldSpan',
  setup(props, { slots }) {
    return () => <span style={{ 'font-weight': 'bold' }}>
      {slots.default?.()}
    </span>
  }
})

export default BoldSpan
