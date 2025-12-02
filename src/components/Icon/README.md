集成文档 https://docs.fontawesome.com/web/use-with/vue
图标合集 https://fontawesome.com/search?ic=free-collection

使用第三方图标库进行封装

- 安装

```
<!-- 工具库 -->
@fortawesome/vue-fontawesome@latest-3 @fortawesome/fontawesome-svg-core

<!-- 图标库 -->
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/free-regular-svg-icons
npm install @fortawesome/free-brands-svg-icons
```

- 注意属性的透传，该组件也是属性中转站，将属性传递给第三方库。(留下自定义的属性 $attrs)
