<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
import HmButton from './components/Button/Button.vue'
import HmCollapse from './components/Collapse/Collapse.vue'
import HmCollapseItem from './components/Collapse/CollapseItem.vue'
import HmIcon from './components/Icon/Icon.vue'
import HmAlert from './components/Alert/Alert.vue'
import HmToolTip from './components/ToolTip/ToolTip.vue'
// import HmDropdown from './components/Dropdown/Dropdown.vue'
import HmDropdown from './components/Dropdown/Dropdown'
import { MenuOption } from './components/Dropdown/types'
// import HmMessage from './components//Message/Message.vue'
import HmMessage from './components//Message'

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

const menuOptions: MenuOption[] = [
  {
    label: h('div', 'vnode测试'),
    key: 1,
    disabled: false,
    divided: false
  },
  {
    label: 'label2',
    key: 2,
    disabled: true,
    divided: true
  },
  {
    label: 'label3',
    key: 3,
    disabled: false,
    divided: false
  },
  {
    label: 'label4',
    key: 4,
    disabled: false,
    divided: false
  }
]

const handleMessage = () => {
  const message = HmMessage({ message: '测试消息', type: 'danger', showClose: true })
  // setTimeout(() => {
  //   message.close()
  // }, 5000)
}
</script>

<template>
  <!-- <HmMessage
    message="Oops, this is a message that does not automatically close."
    show-close
    type="success"
  ></HmMessage> -->
  <!-- <HmMessage
    message="Oops, this is a message that does not automatically close."
    show-close
    type="danger"
  ></HmMessage> -->
  <HmDropdown :menu-options="menuOptions" trigger="hover" @visible-change="console.log">
    <div>移入展示</div>
  </HmDropdown>
  <HmDropdown :menu-options="menuOptions" trigger="click" @visible-change="console.log">
    <div>点击展示</div>
  </HmDropdown>
  <!--  :open-delay="1000" :close-delay="1000" -->
  <HmToolTip content="显示内容" trigger="click">
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
  <HmButton circle @click="handleMessage">按钮, message</HmButton>
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
