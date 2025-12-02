popper.js库实现content显隐。

```
npm install @popperjs/core
```

在根节点中添加`mouseleave`,实现移出整个content及trigger区域时才让content消失。**注意: click模式下不进行隐藏**

**全局添加click触发content隐藏时，我们需要设置trigger为click时阻止事件冒泡**

在绑定contentRef到popper实例中时，watch需要设置出发时机，当dom渲染完毕后进行处理。（`flush: 'post'`）

设置延时功能时，我们可以很好的借助防抖的特性处理。而不需要定时器，**这里需要注意的是，当用户快速移入移出(点击)时会触发多余的其他事件，所以我们在进行显隐时，需要先取消对立事件。**

```js
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
```
