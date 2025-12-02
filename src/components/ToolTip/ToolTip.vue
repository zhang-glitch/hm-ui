<script setup lang="ts">
import { computed, onMounted, ref, watch, onUnmounted } from 'vue'
import { ToolTipEmits, TooltipInstance, ToolTipProps } from './types'
import { createPopper, Instance } from '@popperjs/core'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'HmToolTip'
})

const props = withDefaults(defineProps<ToolTipProps>(), {
  effect: 'dark',
  trigger: 'hover',
  placement: 'bottom',
  openDelay: 0,
  closeDelay: 0
})
const emits = defineEmits<ToolTipEmits>()

const triggerRef = ref<HTMLElement>(null)
const contentRef = ref<HTMLElement>(null)
let popperInstance: Instance = null
const visible = ref(false)

const popperOptions = computed<ToolTipProps['popperOptions']>(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    }
  ],
  ...props.popperOptions
}))

// const handleOpenOrHide = (flag: boolean) => {
//   visible.value = flag
//   emits('visible-change', flag)
// }
const handleOpen = () => {
  console.log('触发移入')
  visible.value = true
  emits('visible-change', true)
}
const handleCLose = () => {
  console.log('触发移出')
  visible.value = false
  emits('visible-change', false)
}

//防抖代替定时器实现延迟效果
const openDebounce = debounce(handleOpen, props.openDelay)
const closeDebounce = debounce(handleCLose, props.closeDelay)

// 防止快速移入移出(点击)时触发多余事件
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
const handleClick = (event: MouseEvent) => {
  // visible.value = !visible.value
  // emits('visible-change', visible.value)
  if (visible.value) {
    closeFinal()
  } else {
    openFinal()
  }
  event.stopPropagation()
}

const handleToolTipLeave = () => {
  if (props.isManual) return
  if (props.trigger === 'click') return
  closeFinal()
}
const handleToolTipClick = () => {
  if (props.isManual) return
  if (props.trigger !== 'click') return
  if (visible.value) {
    closeFinal()
  }
}

const events = computed(() => {
  if (props.isManual) return {}
  if (props.trigger === 'hover') {
    return {
      mouseenter: openFinal
      // mouseleave: () => {
      //   handleOpenOrHide(false)
      // }
    }
  } else if (props.trigger === 'click') {
    return {
      click: handleClick
    }
  }
  return {}
})

watch(
  visible,
  (val) => {
    if (!(val && triggerRef.value && contentRef.value)) {
      // popperInstance?.destroy()
      return
    }
    popperInstance = createPopper(triggerRef.value, contentRef.value, popperOptions.value)
  },
  { flush: 'post' }
)

onUnmounted(() => {
  popperInstance?.destroy()
  document.removeEventListener('click', handleToolTipClick)
})

onMounted(() => {
  document.addEventListener('click', handleToolTipClick)
})

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})
</script>

<template>
  <div class="hm-tooltip" @mouseleave="handleToolTipLeave">
    <div class="hm-tooltip__trigger" v-on="events" ref="triggerRef">
      <slot></slot>
    </div>
    <Transition name="fade">
      <div
        :class="{ 'hm-tooltip__popper': true, [`is-${effect}`]: effect }"
        v-if="(content || $slots.content) && visible"
        ref="contentRef"
      >
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>
