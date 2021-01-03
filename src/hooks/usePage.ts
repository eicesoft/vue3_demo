import { ref, onMounted, onUnmounted } from "vue";
import { debounce } from "lodash";

/**
 * description: 获取页面属性
 */
export function usePage() {
  const domWidth = ref(window.innerWidth);
  const domHeight = ref(window.innerHeight);

  function resize() {
    console.log("resize");
    domWidth.value = document.body.clientWidth;
    domHeight.value = document.body.clientHeight;
  }

  onMounted(() => {
    window.addEventListener("resize", debounce(resize, 40));
  });
  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });

  return { domWidth, domHeight };
}
