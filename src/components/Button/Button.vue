<script setup lang="ts">
import { ref, useSlots } from 'vue'
import type { ButtonProps } from './types'
import HmIcon from '../Icon/Icon.vue'

const slots = useSlots()

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

defineOptions({
  name: 'HmButton'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>

<template>
  <button
    ref="_ref"
    class="hm-button"
    :class="{
      [`hm-button--${type}`]: type,
      [`hm-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :type="nativeType"
    :autofocus="autofocus"
  >
    <hm-icon :icon="icon" :spin="loading"></hm-icon>
    <span v-if="slots.default">
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
