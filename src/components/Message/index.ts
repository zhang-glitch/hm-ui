import { VNode, render, h, nextTick } from "vue";
import Message from "./Message.vue"
import { CreateMessageProps } from "./types";

interface MessageInstance {
  id: string,
  el: HTMLElement,
  instance: InstanceType<typeof Message>
  offset: number
}

let index = 1
const messageInstances: MessageInstance[] = []
export default function HmMessage(props: CreateMessageProps): InstanceType<typeof Message> {
  const id = `message_${index++}`
  let componentInstance = null
  const container = document.createElement('div')
  const offset = calculateOffset(props.offset || 16)

  const close = () => {
    const index = messageInstances.findIndex(item => item.id === id)
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
  render(h(Message, {
    ...props, id,
    offset,
    // 通过 onVnodeMounted 钩子获取实例
    onVnodeMounted: (vnode: VNode) => {
      componentInstance = vnode.component;
    },
    onDestory: close
  }), container)

  const instance = { ...componentInstance, close }

  nextTick(() => {
    const el = container.firstElementChild as HTMLElement
    el && document.body.appendChild(el)
    messageInstances.push({
      id,
      el,
      instance,
      offset
    })
  })

  return instance
}


function calculateOffset(baseOffset, lastMessage?: MessageInstance, delFirstEl = false) {
  if (messageInstances.length === 0 || (delFirstEl && !lastMessage)) {
    return baseOffset;
  }

  // 获取最后一个消息的位置和高度
  lastMessage = lastMessage || messageInstances[messageInstances.length - 1];
  const lastElement = lastMessage.el;
  const lastHeight = lastElement.offsetHeight;
  const lastOffset = lastMessage.offset;

  return lastOffset + lastHeight + baseOffset;
}
