<template>
  <div class="tabber">
    <div
      class="tab"
      @click="tabClick(tab)"
      :class="{ tab_active: tab.is_active }"
      v-for="tab in tabs"
    >
      {{ tab.name }}
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {},
  setup() {
    const tabs = ref([]);
    tabs.value.push({
      name: "test",
      is_active: true
    });
    tabs.value.push({
      name: "test2",
      is_active: false
    });
    const tabClick = tab => {
      for (let t of tabs.value) {
        t.is_active = false;
      }
      tab.is_active = true;
    };
    return { tabs, tabClick };
  }
};
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
        color: $active-color;
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
