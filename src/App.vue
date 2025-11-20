<script setup lang="ts">
import { ref } from 'vue'
import HmButton from './components/Button/Button.vue'
import HmCollapse from './components/Collapse/Collapse.vue'
import HmCollapseItem from './components/Collapse/CollapseItem.vue'
import HmIcon from './components/Icon/Icon.vue'

const a = ref(['1', '2'])
</script>

<template>
  <HmButton type="danger" loading icon="fa-regular fa-pen-to-square"> </HmButton>
  <HmButton type="danger" size="large" icon="arrow-down"> 按钮 </HmButton>
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

  <HmCollapse v-model="a" accordion expand-icon-position="left">
    <HmCollapseItem title="title 1" name="1">content 1</HmCollapseItem>
    <HmCollapseItem title="title 2" name="2">content 2</HmCollapseItem>
    <HmCollapseItem title="title 3" name="3" disabled>content 3</HmCollapseItem>
  </HmCollapse>

  <HmIcon type="primary" icon="arrow-down"></HmIcon>
  <HmIcon type="primary" color="red" icon="arrow-down"></HmIcon>
  <HmIcon type="info" icon="fa-solid fa-apple-whole"></HmIcon>
  <HmIcon type="info" icon=" fa-angle-down"></HmIcon>
</template>

<style scoped></style>
