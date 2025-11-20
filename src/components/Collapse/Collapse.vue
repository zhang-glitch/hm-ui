<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import { CollapseProps, NameType, collapseContextKey, CollapseEmits } from './types'

defineOptions({
  name: 'HmCollapse'
})
const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: () => [],
  accordion: false,
  expandIconPosition: 'right'
})
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}
const handleCollapseItemClick = (name: NameType) => {
  if (props.accordion) {
    activeNames.value = activeNames.value.includes(name) ? [] : [name]
  } else {
    if (activeNames.value.includes(name)) {
      activeNames.value = activeNames.value.filter((item) => item !== name)
    } else {
      activeNames.value.push(name)
    }
  }
  emits('change', name)
  emits('update:modelValue', activeNames.value)
}

watch(
  () => props.modelValue,
  (newValue) => {
    activeNames.value = newValue
  }
)

provide(collapseContextKey, {
  activeNames,
  handleCollapseItemClick,
  expandIconPosition: props.expandIconPosition
})
</script>

<template>
  <div :class="`hm-collapse hm-collapse-icon-position-${expandIconPosition}`">
    <slot></slot>
  </div>
</template>

<style scoped></style>
