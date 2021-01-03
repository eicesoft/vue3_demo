<template>
  <div
    class="element-item"
    :class="{ active: active }"
    @click="elementSelectHandler(data)"
  >
    <template v-if="data.comp_type == ElementGroup.basic">
      <div>
        <el-form-item
          :show-message="false"
          :label="data.label + ':'"
          :required="data.options.required"
          :prop="data.key"
        >
          <template v-if="data.type == ElementTypes.input">
            <el-input
              v-model="model"
              :placeholder="data.options.placeholder"
            ></el-input>
          </template>

          <template v-else-if="data.type == ElementTypes.textarea">
            <el-input
              type="textarea"
              :rows="data.options.rows"
              :placeholder="data.options.placeholder"
              v-model="model"
            ></el-input>
          </template>

          <template v-else-if="data.type == ElementTypes.radio">
            <el-radio-group v-model="data.options.defaultValue">
              <el-radio
                v-for="(item, index) in data.options.options"
                :label="item.value"
                :key="index"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </template>

          <template v-else-if="data.type == ElementTypes.checkbox">
            <el-checkbox-group v-model="data.options.defaultValue">
              <el-checkbox
                v-for="(item, index) in data.options.options"
                :label="item.value"
                :key="index"
              >
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </template>

          <template v-else-if="data.type == ElementTypes.select">
            <el-select v-model="data.options.defaultValue" placeholder="请选择">
              <el-option
                v-for="item in data.options.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
      </div>
    </template>

    <template v-else-if="data.comp_type == ElementGroup.view">
      <template v-if="data.type == ElementTypes.divider">
        <el-divider
          @click.stop="elementSelectHandler(data)"
          content-position="left"
        >
          {{ data.label }}
        </el-divider>
      </template>
    </template>

    <template v-else-if="data.comp_type == ElementGroup.layout">
      <template v-if="data.type == ElementTypes.grid">
        <el-row>
          <el-col :span="col.span" v-for="col in data.columns" :key="col.key">
            <PreviewForm v-model:list="col.list"></PreviewForm>
          </el-col>
        </el-row>
      </template>
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
        @click.stop="copy"
      ></span>
      <span class="icon iconfont icon-delete" @click.stop="remove"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import draggable from "vuedraggable";
import { ElementGroup, ElementTypes, ElementItem } from "./config";

export default defineComponent({
  name: "PreviewFormItem",
  components: { draggable },
  props: {
    data: {
      type: Object as PropType<ElementItem>,
      default: () => {
        return {};
      }
    },
    active: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    index: {
      type: Number as PropType<number>
    }
  },
  methods: {
    elementSelectHandler(element) {
      this.$emit("select", element);
    },
    remove() {
      this.$emit("remove", this.index);
    },
    copy() {
      this.$emit("copy", this.index);
    }
  },
  setup(props) {
    const activeTab = ref<String>("element");
    const model = ref<any>();
    const selectElement = ref<ElementItem>(undefined);

    // console.log(props.data);
    return { activeTab, model, ElementGroup, ElementTypes };
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
  height: 100%;
}
</style>
