vue中的函数式组件

- createApp

```js
createApp(Message, {
  message,
  type
}).mount(document.body.appendChild(document.createElement('div')))
```

- render,

  - **vnode可以通过onVnodeMounted获取组件实例**

  ```js
  render(h(Message, {
      ...props, id,
      // 通过 onVnodeMounted 钩子获取实例
      onVnodeMounted: (vnode: VNode) => {
        componentInstance = vnode.component;
      }
    }), document.body)
  ```

  - 如果直接挂在到`document.body`下，多次触发会直接覆盖上一次的消息。所以我们需要创建新节点，然后去内容，在删除新节点。直接挂在到新节点的内容中

  ```js
    const container = document.createElement('div')
      render(h(Message, {
        ...props, id,
        // 通过 onVnodeMounted 钩子获取实例
        onVnodeMounted: (vnode: VNode) => {
          componentInstance = vnode.component;
        }
      }), container)
    document.body.appendChild(container.firstElementChild!)
  ```

需要注意的是删除完毕后，我们还需要重新计算删除message后续messge的位置

- `messageInstances.slice(index)` 获取后续messages
- `preIndex` 因为我们计算每个message的offset，是根据上一个message的位置计算的。所以这里进行标记。
- **注意：删除第一个message时，后续message计算由于无上一个message,所以初始message的offset为16，后续的mesasge计算就和以前一样了。**

```js
const close = () => {
  const index = messageInstances.findIndex((item) => item.id === id)
  if (index > -1) {
    messageInstances.splice(index, 1)
  }
  componentInstance?.exposed?.close?.()
  let preIndex = index
  // 重新计算当前id后续组件的offset
  messageInstances.slice(index).forEach((item) => {
    item.offset = calculateOffset(props.offset || 16, messageInstances[preIndex - 1], true)
    item.el.style.top = `${item.offset}px`
    preIndex++
  })
}
```
