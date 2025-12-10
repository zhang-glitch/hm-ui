和collapse组件不同,这里我们采用props的方式传递循环项

如果我们想要渲染传递的h函数,我们需要借助setup来实现,它可以返回一个渲染函数作为组件的模板. https://cn.vuejs.org/api/composition-api-setup.html#usage-with-render-functions

```js
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RenderVNode',
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
```

dropdown组件是借助tooltip组件实现的,这里有个小问题,我们以前封装tooltip组件时,实现了一个移出tooltip区域隐藏内容区域的功能,但是对于下拉菜单来说,由于下拉框和移入/点击区域有间距,所以在移动的过程中触发了隐藏,所以需要延时关闭,让其可以来的及移入内容区域.

```js
let closeTimer = null
const handleToolTipLeave = () => {
  if (props.isManual) return
  if (props.trigger === 'click') return
  // 设置短暂延时后再关闭
  closeTimer = setTimeout(() => {
    closeFinal()
  }, 150) // 150ms 延时
}
const handleMouseEnterContent = () => {
  // 当鼠标进入内容区域时清除关闭定时器
  closeTimer && clearTimeout(closeTimer)
}
```

由于该组件下拉项可以传递虚拟dom,所以我们也可以使用tsx来编写组件,**这里需要注意的是tsx中不能使用`v-bind`来结构绑定props**

```js
{
  /* tsx中不能使用v-bind={props}结构props传递 */
}
;<ToolTip
  effect={props.effect}
  trigger={props.trigger}
  placement={props.placement}
  openDelay={props.openDelay}
  closeDelay={props.closeDelay}
  popperOptions={props.popperOptions}
  menuOptions={props.menuOptions}
  hideToClick={props.hideToClick}
  isManual={props.isManual}
  ref={tooltipRef}
  onVisibleChange={visibleChange}
>
  {{
    default: () => slots.default?.(),
    content: () => <ul class="hm-dropdown__menu">{options.value}</ul>
  }}
</ToolTip>
```

最重要的一点是, **由于setup只执行一次,我们如果依赖响应式数据,就需要通过闭包来实现,如果导出数据的话.如果封装hooks,就需要传递响应式数据,而不是传递结构的,例如取`ref.value`**

```js
// 需要注意,由于setup只执行一次,如果依赖响应式数据,我们需要通过闭包来进行更新,不能直接返回 tooltipRef.value?.show
defineExpose <
  DropdownInstance >
  {
    show: () => tooltipRef.value?.show(),
    hide: () => tooltipRef.value?.hide()
  }
```
