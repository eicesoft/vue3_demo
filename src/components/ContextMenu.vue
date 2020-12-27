<template>
  <transition name="zoom-fade">
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
  </transition>
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
$radius: 2px;
.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 1;
}

.contextmenu {
  position: fixed;
  z-index: 100;
  background-color: #efefef;
  border: 1px solid rgb(230, 230, 230);
  padding: 0px;
  user-select: none;
  border-radius: $radius;

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
