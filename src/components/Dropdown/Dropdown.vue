<script setup lang="ts">
import { computed, ref } from 'vue'
import ToolTip from '../ToolTip/ToolTip.vue'
import { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from './types'
import { omit } from 'lodash-es'
import RenderVNode from '../Common/RenderVNode'

defineOptions({
  name: 'HmDropdown'
})
const emits = defineEmits<DropdownEmits>()
const props = withDefaults(defineProps<DropdownProps>(), {
  hideToClick: true,
  effect: 'light',
  closeDelay: 300
})
const tooltipProps = computed(() => omit(props, ['menuOptions', 'hideToClick']))

const tooltipRef = ref<InstanceType<typeof ToolTip>>(null)

const handleVisibleChange = (visible: boolean) => {
  emits('visible-change', visible)
}
const handleItemClick = (item: MenuOption) => {
  if (item.disabled) return
  props.hideToClick && tooltipRef.value?.hide()
  emits('select', item)
}

// 需要注意,由于setup只执行一次,如果依赖响应式数据,我们需要通过闭包来进行更新
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>

<template>
  <div class="hm-dropdown">
    <ToolTip v-bind="tooltipProps" ref="tooltipRef" @visible-change="handleVisibleChange">
      <slot />
      <template #content>
        <ul class="hm-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li
              :class="{
                'hm-dropdown__item': true,
                'is-disabled': item.disabled,
                'is-divided': item.divided
              }"
              @click="handleItemClick(item)"
            >
              <RenderVNode :vnode="item.label"></RenderVNode>
            </li>
          </template>
        </ul>
      </template>
    </ToolTip>
  </div>
</template>
