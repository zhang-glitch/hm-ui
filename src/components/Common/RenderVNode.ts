import { defineComponent } from "vue";

export default defineComponent({
  name: "RenderVNode",
  props: {
    vnode: {
      type: [String, Object],
      reqired: true
    }
  },
  setup(props) {
    return () => props.vnode
  }
})