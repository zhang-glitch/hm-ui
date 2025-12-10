在封装hooks时，我们需要注意，因为setup只会执行一次。所以如果hooks以来响应式数据，我们就需要传递ref值，而不是结构响应式传入

```js
// 这里的el不正确，使用时应该传入ref响应式数据
export default function useOutsideClick(el: HTMLElement | null, callback: () => void) {
  const handleClick = (e: MouseEvent) => {
    if (el && !el.contains(e.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  })
}
```
