import { onMounted, onUnmounted, Ref, } from "vue";

export default function useOutsideClick(el: Ref<HTMLElement | null>, callback: () => void) {
  const handleClick = (e: MouseEvent) => {
    if (!el.value?.contains(e.target as Node)) {
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