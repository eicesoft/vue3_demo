<template>
  <el-collapse-transition>
    <div v-show="isShowContextMenu" :style="menuStyle" class="contextmenu">
      <ul>
        <li
          @click="menuClick(menu)"
          v-for="(menu, index) in menus"
          :key="index"
        >
          <i :class="menu.icon"></i>
          {{ menu.label }}
        </li>
      </ul>
    </div>
  </el-collapse-transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, reactive } from "vue";
import VueTypes from "vue-types";

export default defineComponent({
  name: "ContextMenu",
  props: {
    target: VueTypes.array,
    menus: VueTypes.object
  },
  setup(props, ctx) {
    const isShowContextMenu = ref<boolean>(false);
    const menuStyle = reactive<any>({ left: "0px", top: "0px" });

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
      menuStyle.left = event.clientX + "px";
      menuStyle.top = event.clientY + "px";
    };

    const menuClick = menu => {
      ctx.emit("menu-click", menu, props.target);
    };

    return {
      isShowContextMenu,
      show,
      menuClick,
      menuStyle
    };
  }
});
</script>

<style lang="scss" scoped>
$radius: 2px;

.contextmenu {
  position: fixed;
  z-index: 100;
  background-color: #efefef;
  border: 1px solid rgb(230, 230, 230);
  padding: 0px;
  user-select: none;
  border-radius: $radius;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  ul {
    border-radius: $radius;
    min-width: 160px;
    list-style-type: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    li {
      padding: 6px 10px;
      background-color: #fefefe;
      &:hover {
        background-color: #cfe6fd;
        color: #555555;
      }

      &:first-child {
        border-top-left-radius: $radius;
        border-top-right-radius: $radius;
      }
      &:last-child {
        border-bottom-left-radius: $radius;
        border-bottom-right-radius: $radius;
      }
    }
  }
}
</style>
>
