<script setup lang="ts">
import { computed, inject } from 'vue'
import { collapseContextKey, CollapseItemProps } from './types'
defineOptions({
  name: 'HmCollapseItem'
})
const props = withDefaults(defineProps<CollapseItemProps>(), {
  disabled: false
})

const collapseContext = inject(collapseContextKey)

const isDisplayContent = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})

const handleCollapseItemClick = () => {
  if (props.disabled) return
  collapseContext?.handleCollapseItemClick(props.name)
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    // 防止动画过程中，内容出现，但是高度在动态变化。所以这里增加一个隐藏效果，让内容随高度一起出现
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  // 动画完成，height无用，需要清楚该css属性
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}
</script>

<template>
  <div
    class="hm-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <!--
     BEM
      - 内容类， __
      - 状态类，样式类 -- 
    -->
    <div
      class="hm-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isDisplayContent
      }"
      :id="`item-header-${name}`"
      @click="handleCollapseItemClick"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <!-- 为了解决初始化padding，动画卡顿问题 -->
      <div class="hm-collapse-item__wrapper" v-show="isDisplayContent">
        <div class="hm-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
