<template>
  <div class="tabber">
    <i
      class="el-icon-arrow-left button-icon"
      @click="scrollLeft"
      :class="{ is_show: left_disible }"
    ></i>
    <div id="tablist" class="tab-list" ref="tablist">
      <div
        class="tab"
        @contextmenu.prevent="
          event => {
            tabContextMenu(event, tab);
          }
        "
        @click="tabClick(tab)"
        :class="{ tab_active: tab.is_active }"
        v-for="tab in open_tabs"
      >
        {{ tab.name }}
        <i class="el-icon-close" @click.stop="tabClose(tab)"></i>
      </div>
    </div>
    <i
      class="el-icon-arrow-right button-icon"
      @click="scrollRight"
      :class="{ is_show: right_disible }"
    ></i>
    <el-popconfirm
      title="确定要关闭其他窗口吗？"
      cancelButtonText="取消"
      confirmButtonText="确定"
      @confirm="closeAll(false)"
    >
      <template #reference>
        <i title="关闭其他窗口" class="el-icon-close button-icon"></i>
      </template>
    </el-popconfirm>

    <el-popconfirm
      title="确定要关闭全部窗口吗？"
      cancelButtonText="取消"
      confirmButtonText="确定"
      @confirm="closeAll(true)"
    >
      <template #reference>
        <i title="关闭全部窗口" class="el-icon-circle-close button-icon"></i>
      </template>
    </el-popconfirm>

    <ContextMenu
      ref="tab_context_menu"
      @menu-click="contextMenuClick"
      :menus="menus"
      :target="tab_target"
    ></ContextMenu>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  nextTick
} from "vue";
import ContextMenu from "/@/components/ContextMenu.vue";
import router from "/@/routers";
import { store } from "/@/store";

enum MenuKeys {
  close = "close",
  closeAll = "closeAll",
  closeOther = "closeOther"
}

export default defineComponent({
  name: "ice-Tabber",
  components: { ContextMenu },
  data() {
    return {
      menus: [
        { label: "关闭", key: MenuKeys.close, icon: "el-icon-close" },
        {
          label: "关闭其他",
          key: MenuKeys.closeAll,
          icon: "el-icon-circle-close"
        },
        { label: "关闭全部", key: MenuKeys.closeAll, icon: "el-icon-delete" }
      ]
    };
  },
  setup() {
    const isShowContextMenu = ref(false);
    const contextMenuLeft = ref(0);
    const contextMenuTop = ref(0);
    const tab_target = ref({});
    const ctx = getCurrentInstance();
    const TabListEle: any = ref({});
    onMounted(() => {
      TabListEle.value = ctx.refs.tablist;

      window.addEventListener("resize", refreshButton);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", refreshButton);
    });
    const { fullPath, meta } = router.currentRoute.value;

    const left_disible = ref<Boolean>(true);
    const right_disible = ref<Boolean>(true);

    store.dispatch("tab/add", {
      name: meta.title,
      is_active: true,
      path: fullPath
    });

    const refreshButton = () => {
      nextTick(() => {
        const { scrollLeft, scrollWidth, clientWidth } = TabListEle.value;
        if (scrollLeft === 0) {
          left_disible.value = true;
        } else {
          left_disible.value = false;
        }

        if (scrollLeft + clientWidth - scrollWidth === 0) {
          right_disible.value = true;
        } else {
          right_disible.value = false;
        }
      });
    };

    const tabClick = async tab => {
      await store.dispatch("tab/click", tab);

      refreshButton();
    };
    const tabClose = async tab => {
      await store.dispatch("tab/close", tab);
      refreshButton();
    };
    const closeAll = async flag => {
      console.log("close All");
      await store.dispatch("tab/close_all", flag);
    };

    const scroll = val => {
      let duration = 10;

      const step: number = val / duration;
      // console.log(step);
      const tablist: any = ctx.refs.tablist;
      let count: number = 1;
      const render = () => {
        let scrollLeft = TabListEle.value.scrollLeft + step * count;
        // console.log(scrollLeft);

        TabListEle.value.scroll(scrollLeft, 0);
        count++;
        if (count <= duration) {
          window.requestAnimationFrame(render);
        } else {
          refreshButton();
        }
      };
      window.requestAnimationFrame(render);
    };

    const tabContextMenu = (event: MouseEvent, tab: any) => {
      ctx.refs.tab_context_menu.show(event);
      tab_target.value = tab;
      return false;
    };

    const contextMenuClick = (menu, target) => {
      switch (menu.key) {
        case MenuKeys.close:
          tabClose(target);
          break;
        case MenuKeys.closeOther:
          closeAll(false);
          break;
        case MenuKeys.closeAll:
          closeAll(true);
          break;
      }
    };

    return {
      open_tabs: store.getters["tab/all_tabs"],
      left_disible,
      right_disible,
      tab_target,

      tabClick,
      tabClose,
      closeAll,
      scrollLeft: () => scroll(-30),
      scrollRight: () => scroll(30),
      tabContextMenu,
      contextMenuClick
    };
  }
});
</script>

<style lang="scss" scoped>
$border-color: #409eff;
$color: #409eff;
$active-color: #e4f2ff;
.tabber {
  display: flex;
  background-color: rgb(245, 245, 245);
  border-bottom: 1px solid rgb(230, 230, 230);

  .is_show {
    color: rgb(196, 196, 196);
    &:hover {
      color: rgb(196, 196, 196) !important;
    }
  }
  .button-icon {
    padding: 6px 4px;
    font-weight: 900;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
  .tab-list {
    width: 92%;
    display: flex;
    overflow: hidden;

    margin-top: -1px;
    .tab {
      position: relative;
      z-index: 2;

      min-width: 65px;
      text-align: center;
      user-select: none;
      cursor: pointer;
      color: $color;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;

      padding: 6px 20px;
      &:hover {
        background-color: $active-color;
        border-bottom: 2px solid $border-color;
        i {
          display: inline !important;
        }
      }
      i {
        display: none;
        border-radius: 30px;
        &:hover {
          color: #000;
          background-color: $active-color;
        }
      }
    }
  }
  .tab_active {
    i {
      display: inline !important;
    }
    background-color: $active-color;
    border-bottom: 2px solid $border-color;
    // color: #000;
  }
}
</style>
