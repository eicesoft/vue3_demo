<template>
  <el-row>
    <el-col :span="size">
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane
          v-for="tab in tabs"
          :label="tab.label"
          :name="tab.id + ''"
        ></el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="24 - size">
      <div class="right-tools">
        <slot></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import filterApi from "/@/api/filter";

export default defineComponent({
  props: {
    module: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 16
    }
  },
  async setup(props, ctx) {
    const { sortBy } = window.$_;

    let tab_list = await filterApi.getFilters({ module: props.module });
    const tabs = ref([]);
    tab_list = sortBy(tab_list, ["sort"]);
    tabs.value = tab_list;
    const activeName = ref<string>("");
    if (tab_list.length > 0) {
      activeName.value = tab_list[0].id + "";
      ctx.emit("change", tab_list[0]);
    }

    const changeTab = (tab, event) => {
      const { filter, head } = window.$_;
      let data = head(
        filter(tab_list, item => {
          if (item.id == parseInt(tab.props.name)) {
            return true;
          }
        })
      );
      if (data) {
        ctx.emit("change", data);
      }
    };

    return {
      changeTab,
      activeName,
      tabs
    };
  }
});
</script>

<style lang="scss" scoped>
.right-tools {
  position: relative;

  /deep/ .el-tabs__header {
    margin-bottom: 0 !important;
  }
}
</style>
