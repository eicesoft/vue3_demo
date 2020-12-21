<template>
  <div class="tabber">
    <div
      class="tab"
      @click="tabClick(tab)"
      :class="{ tab_active: tab.is_active }"
      v-for="tab in tabs"
    >
      {{ tab.name }}
      <i class="el-icon-close" @click.stop="tabClose(tab)"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import router from "/@/routers";
import { store } from "/@/store";

export default defineComponent({
  name: "ice-Tabber",
  setup() {
    const { fullPath, meta } = router.currentRoute.value;

    store.dispatch("tab/add", {
      name: meta.title,
      is_active: true,
      path: fullPath
    });
    console.log();

    // const tabs = ref([
    //   {
    //     name: meta.title,
    //     is_active: true,
    //     path: fullPath
    //   }
    // ]);

    // // for (let t of tabs.value) {
    // //   if (t.path == router.currentRoute.value.path) {
    // //     t.is_active = true;
    // //   }
    // // }
    // // tabs.value.push();
    // const tabClick = tab => {
    //   for (let t of tabs.value) {
    //     t.is_active = false;
    //   }
    //   tab.is_active = true;
    //   router.push(tab.path);
    // };
    const tabClick = tab => {
      store.dispatch("tab/click", tab);
    };
    const tabClose = tab => {
      store.dispatch("tab/close", tab);
    };
    return { tabs: store.getters["tab/all_tabs"], tabClick, tabClose };
  }
});
</script>

<style lang="scss" scoped>
$border-color: #409eff;
$color: #409eff;
$active-color: #cbe2f8;
.tabber {
  display: flex;
  border-bottom: 1px solid $border-color;
  padding: 0 0 0 8px;
  .tab {
    user-select: none;
    cursor: pointer;
    color: $color;
    border-top: 1px solid $border-color;
    border-right: 1px solid $border-color;

    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    padding: 4px 20px;
    // margin: 0 1px 0 0;
    &:first-child {
      border-left: 1px solid $border-color;

      // border-right: 1px solid $border-color;
    }
    &:hover {
      background-color: $active-color;
    }
    i {
      border-radius: 30px;
      &:hover {
        color: #000;
        background-color: $active-color;
      }
    }
  }
  .tab_active {
    background-color: $active-color;
    // color: #000;
  }
}
</style>
