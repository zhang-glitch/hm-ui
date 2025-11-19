<script setup lang="ts">
import { ref } from 'vue'
import HmButton from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'

const a = ref(['1', '2'])
</script>

<template>
  <HmButton type="danger" size="large"> 按钮 </HmButton>
  <HmButton plain>Plain 按钮</HmButton>
  <HmButton round>Round 按钮</HmButton>
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

  <Collapse v-model="a" accordion>
    <CollapseItem title="title 1" name="1">content 1</CollapseItem>
    <CollapseItem title="title 2" name="2">content 2</CollapseItem>
    <CollapseItem title="title 3" name="3" disabled>content 3</CollapseItem>
  </Collapse>
</template>

<style scoped></style>
