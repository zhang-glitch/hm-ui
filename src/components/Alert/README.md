注意：如果我们给默认插槽设置了特定class,那么我们就需要将slot包裹在特定class元素中。而不是直接将其写在slot中。

```
<span class="hm-alert__title" v-if="title || $slots.title">
  <slot name="title">{{ title }}</slot></span
>

<!-- 不是这种 -->
<slot name="title">
  <span class="hm-alert__title" >{{ title }}</span>
</slot>
```

提供主题样式，在使用`@each $val in primary, info, success, warning, danger`生成主题样式时，也是遵循css作用域的。`is-light`, `is-dark`

```css
@each $val in primary, info, success, warning, danger {
  .is-light.hm-alert--$(val) {
    --hm-alert-bg-color: var(--hm-color-$(val)-light-9);
    --hm-alert-border-color: var(--hm-color-$(val)-light-8);
    --hm-alert-text-color: var(--hm-color-$(val));
    .hm-alert__close {
      --hm-icon-color: var(--hm-color-$(val));
    }
  }
  .is-dark.hm-alert--$(val) {
    --hm-alert-bg-color: var(--hm-color-$(val));
    --hm-alert-border-color: var(--hm-color-$(val));
    .hm-alert__close {
      --hm-icon-color: var(--hm-color-$(val));
    }
  }
}
```
