<template>
  <div class="element-item" :class="{ active: active }">
    <template v-if="data.comp_type == 'basic'">
      <div @click.stop="elementSelectHandler(data)">
        <el-form-item :label="data.label">
          <template v-if="data.type == 'input'">
            <el-input
              v-model="model"
              :width="data.options.width"
              :placeholder="data.options.placeholder"
            ></el-input>
          </template>

          <template v-else-if="data.type == 'textarea'">
            <el-input
              type="textarea"
              :rows="3"
              :placeholder="data.options.placeholder"
              v-model="model"
            ></el-input>
          </template>
        </el-form-item>
      </div>
    </template>

    <template v-else-if="data.comp_type == 'layout'">
      <template v-if="data.type == 'grid'">
        <el-row>
          <el-col :span="col.span" v-for="col in data.columns">
            <PreviewForm v-model:list="col.list"></PreviewForm>
          </el-col>
        </el-row>
      </template>
    </template>

    <template v-else-if="data.comp_type == 'view'">
      <el-divider
        @click.stop="elementSelectHandler(data)"
        content-position="left"
      >
        {{ data.label }}
      </el-divider>
    </template>
    <template v-else>
      {{ data }}
    </template>

    <div
      style="cursor: move; top: 0; left: 0; position: absolute"
      class="handle icon iconfont icon-move"
    ></div>

    <div style="top: 0; right: 0; position: absolute; color: #be3a06">
      {{ data.key }}
    </div>

    <div style="right: 5px; bottom: 2px; position: absolute">
      <span
        v-if="data.comp_type !== 'layout'"
        class="icon iconfont icon-copy"
      ></span>
      <span class="icon iconfont icon-delete" @click="remove"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "PreviewFormItem",
  components: { draggable },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    active: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    }
  },
  methods: {
    elementSelectHandler(element) {
      this.$emit("select", element);
    },
    remove() {
      this.$emit("remove", this.index);
    }
  },
  setup(props) {
    const activeTab = ref("element");
    const model = ref();
    const selectElement = ref({});
    const gridList = ref([]);

    // console.log(props.data);
    return { activeTab, model, gridList };
  }
});
</script>

<style lang="scss" scoped>
.element-item {
  position: relative;
  border: 1px dashed #ececec;
  background-color: #fafafa;
  padding: 10px;
  margin: 6px 0;
  &:hover {
    border: 1px dashed #d1d1d1;
  }
  .icon {
    cursor: pointer;
    font-size: 22px;
    &:hover {
      color: #4680ff;
    }
  }
}

.active {
  background-color: #fffaeb;
}
.el-col {
  border: 1px dashed #ececec;
  background-color: #ffffe7;
  min-height: 40px;
}
</style>
