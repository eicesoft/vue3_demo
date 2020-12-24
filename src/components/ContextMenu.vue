<template>
  <div
    v-show="isShowContextMenu"
    :style="{
      top: contextMenuTop + 'px',
      left: contextMenuLeft + 'px'
    }"
    class="contextmenu"
  >
    <ul>
      <li @click="menuClick(menu)" v-for="menu in menus">
        <i :class="menu.icon"></i>
        {{ menu.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
export default defineComponent({
  name: "ContextMenu",
  props: {
    target: {
      type: Object,
      default() {
        return {};
      }
    },
    menus: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props, ctx) {
    const isShowContextMenu = ref(false);
    const contextMenuLeft = ref(0);
    const contextMenuTop = ref(0);

    const hide = () => {
      isShowContextMenu.value = false;
    };

    onMounted(() => {
      document.addEventListener("click", hide);
    });

    onUnmounted(() => {
      document.removeEventListener("click", hide);
    });

    const show = (event: MouseEvent) => {
      isShowContextMenu.value = true;
      contextMenuLeft.value = event.clientX;
      contextMenuTop.value = event.clientY;
    };

    const menuClick = menu => {
      // console.log(ctx);
      ctx.emit("menu-click", menu, props.target);
    };

    return {
      isShowContextMenu,
      contextMenuLeft,
      contextMenuTop,
      show,
      menuClick
    };
  }
});
</script>

<style lang="scss" scoped>
.contextmenu {
  position: fixed;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #ececec;
  padding: 0px;
  user-select: none;
  border-radius: 4px;

  ul {
    border-radius: 4px;

    min-width: 160px;
    list-style-type: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    li {
      border-radius: 4px;

      padding: 6px 10px;
      background-color: #fefefe;
      &:hover {
        background-color: #409eff;
        color: #ececec;
      }
    }
  }
}
</style>
>
