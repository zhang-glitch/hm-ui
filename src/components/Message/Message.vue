<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MessageProps } from './types'
import RenderVNode from '../Common/RenderVNode'
import HmIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'HmMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  showIcon: true,
  offset: 16
})

const iconMap = {
  primary: 'circle-info',
  success: 'circle-check',
  warning: 'circle-exclamation',
  danger: 'triangle-exclamation',
  info: 'circle-info'
}

const visible = ref(false)

let timer: NodeJS.Timeout
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
    props.onDestory()
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
onMounted(() => {
  visible.value = true
  startTimer()
})

defineExpose({
  close: () => {
    visible.value = false
  }
})
</script>

<template>
  <Transition name="fade-up">
    <div
      :id="id"
      class="hm-message"
      v-if="visible"
      :class="{
        [`hm-message--${type}`]: type,
        'is-close': showClose
      }"
      :style="{ top: `${offset}px` }"
      role="alert"
      ref="messageRef"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <hm-icon class="hm-message__icon" :icon="`${iconMap[type]}`" v-if="showIcon"></hm-icon>
      <div class="hm-message__content">
        <slot>
          <RenderVNode :vnode="message" v-if="message" />
        </slot>
      </div>
      <div class="hm-message__close" v-if="showClose">
        <HmIcon @click.stop="props.onDestory" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
