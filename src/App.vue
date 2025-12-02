<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HmButton from './components/Button/Button.vue'
import HmCollapse from './components/Collapse/Collapse.vue'
import HmCollapseItem from './components/Collapse/CollapseItem.vue'
import HmIcon from './components/Icon/Icon.vue'
import HmAlert from './components/Alert/Alert.vue'
import HmToolTip from './components/ToolTip/ToolTip.vue'

const a = ref(['1', '2'])
const hancleClose = () => {
  console.log('close')
}

const trigger = ref<any>('hover')

setTimeout(() => {
  trigger.value = 'click'
}, 2000)

const HmToolTipRef = ref<any>()
const shoTip = () => {
  HmToolTipRef.value?.show()
}
const hideTip = () => {
  HmToolTipRef.value?.hide()
}
</script>

<template>
  <!--  :open-delay="1000" :close-delay="1000" -->
  <HmToolTip content="显示内容">
    <HmIcon type="primary" icon="arrow-down"></HmIcon>0-000000000000000000000000
  </HmToolTip>
  <HmToolTip content="显示内容" effect="light">
    <HmIcon type="primary" icon="arrow-down"></HmIcon>0-000000000000000000000000
  </HmToolTip>
  <!-- <HmToolTip
    content="显示内容"
    :trigger="trigger"
    is-manual
    ref="HmToolTipRef"
    :popper-options="{ placement: 'bottom' }"
  >
    <HmIcon type="primary" icon="arrow-down"></HmIcon>
  </HmToolTip> -->
  <HmButton type="danger" loading icon="fa-regular fa-pen-to-square"> </HmButton>
  <HmButton plain @click="shoTip">Plain 按钮</HmButton>
  <HmButton round @click="hideTip">Round 按钮</HmButton>
  <HmButton circle>按钮</HmButton>
  <HmButton disabled>Disabled 按钮</HmButton>
  <HmButton type="primary">Primary 按钮</HmButton>
  <HmButton type="success">Success 按钮</HmButton>
  <HmButton type="info">Info 按钮</HmButton>
  <HmButton type="warning">Warning 按钮</HmButton>
  <HmButton type="danger">Danger 按钮</HmButton>
  <HmButton type="primary" plain>Primary 按钮</HmButton>
  <HmButton type="success" plain>Success 按钮</HmButton>
  <HmButton type="info" plain>Info 按钮</HmButton>
  <HmButton type="warning" plain>Warning 按钮</HmButton>
  <HmButton type="danger" plain>Danger 按钮</HmButton>
  <HmButton size="large">Large 按钮</HmButton>
  <HmButton size="small">Small 按钮</HmButton>
  <a href="">222</a>

  <HmCollapse v-model="a" accordion expand-icon-position="left">
    <HmCollapseItem title="title 1" name="1">content 1</HmCollapseItem>
    <HmCollapseItem title="title 2" name="2">content 2</HmCollapseItem>
    <HmCollapseItem title="title 3" name="3" disabled>content 3</HmCollapseItem>
  </HmCollapse>

  <HmIcon type="primary" icon="arrow-down"></HmIcon>
  <HmIcon type="primary" color="red" icon="arrow-down"></HmIcon>
  <HmIcon type="info" icon="fa-solid fa-apple-whole"></HmIcon>
  <HmIcon type="info" icon=" fa-angle-down"></HmIcon>

  <HmAlert title="测试" description="测试描述" effect="dark" closable></HmAlert>
  <HmAlert title="测试" description="测试描述" type="danger"></HmAlert>
  <HmAlert title="测试" description="测试描述" type="success"></HmAlert>
  <HmAlert title="测试" description="测试描述" type="warning"></HmAlert>
  <HmAlert title="测试" description="测试描述" type="info"></HmAlert>
  <HmAlert center closable @close="hancleClose">
    <template #title>
      <span>这是一个title</span>
    </template>
    <div>描述</div>
  </HmAlert>
</template>

<style scoped></style>
