<script setup lang="ts">
import { AlertEmits, AlertProps } from './types'
import HmIcon from '../Icon/Icon.vue'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'HmAlert'
})
const props = withDefaults(defineProps<AlertProps>(), {
  type: 'primary',
  closable: false,
  center: false,
  showIcon: true,
  effect: 'light'
  // autoClose: 2000
})
const emits = defineEmits<AlertEmits>()

const iconMap = {
  primary: 'circle-info',
  success: 'circle-check',
  warning: 'circle-exclamation',
  danger: 'triangle-exclamation',
  info: 'circle-info'
}

const visible = ref(true)

const handleClick = () => {
  visible.value = false
  emits('close')
}

onMounted(() => {
  if (props.autoClose) {
    setTimeout(() => {
      visible.value = false
      emits('close')
    }, props.autoClose)
  }
})
</script>

<template>
  <Transition name="alert-fade-up">
    <div
      v-show="visible"
      :class="{
        'hm-alert': true,
        [`hm-alert--${type}`]: type,
        [`is-${effect}`]: effect,
        'is-center': center
      }"
    >
      <slot name="icon">
        <hm-icon class="hm-alert__icon" :icon="`${iconMap[type]}`" v-if="showIcon"></hm-icon>
      </slot>
      <div class="hm-alert__content">
        <span class="hm-alert__title" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot></span
        >
        <p class="hm-alert__description" v-if="description || $slots.default">
          <slot>{{ description }}</slot>
        </p>

        <hm-icon
          class="hm-alert__close"
          icon="fa-solid fa-xmark"
          v-if="closable"
          @click="handleClick"
        ></hm-icon>
      </div>
    </div>
  </Transition>
</template>
