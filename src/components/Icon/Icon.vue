<script setup lang="ts">
import { computed } from 'vue'
import { IconProps } from './types'
import { omit } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'HmIcon',
  inheritAttrs: false
})

const props = defineProps<IconProps>()
const iconAwsomeProps = computed(() => omit(props, ['type', 'color']))
</script>

<template>
  <!-- 集成文档 https://docs.fontawesome.com/web/use-with/vue -->
  <!-- 图标合集 https://fontawesome.com/search?ic=free-collection -->
  <i
    class="hm-icon"
    :class="{ [`hm-icon--${type}`]: type }"
    v-bind="$attrs"
    :style="{ color: color }"
  >
    <font-awesome-icon v-bind="iconAwsomeProps" />
  </i>
</template>
