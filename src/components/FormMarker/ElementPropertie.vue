<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="元件属性" name="element">
        <!-- {{ dataProp }} -->
        <template v-if="dataProp != undefined">
          <el-form
            size="small"
            :model="dataProp"
            v-if="Object.keys(dataProp).length != 0"
          >
            <el-form-item
              label="Key:"
              v-if="dataProp.comp_type == ElementGroup.basic"
            >
              <el-input v-model="dataProp.key" />
            </el-form-item>

            <el-form-item label="标签:">
              <el-input v-model="dataProp.label" />
            </el-form-item>

            <el-form-item
              label="提示文字:"
              v-if="Object.keys(dataProp.options).includes('placeholder')"
            >
              <el-input v-model="dataProp.options.placeholder" />
            </el-form-item>
            <el-form-item
              label="行:"
              v-if="Object.keys(dataProp.options).includes('rows')"
            >
              <el-input v-model="dataProp.options.rows" />
            </el-form-item>

            <el-form-item
              label="Width:"
              v-if="dataProp.comp_type == ElementGroup.basic"
            >
              <el-input v-model="dataProp.options.width" />
            </el-form-item>

            <el-form-item
              label-position="top"
              label="选项:"
              v-if="dataProp.options.options?.length"
            >
              <br />
              <draggable
                handle=".option-handle"
                v-model:list="dataProp.options.options"
                item-key="label"
              >
                <template #item="{ element, index }">
                  <el-row :gutter="4" class="option-row">
                    <el-col :span="2">
                      <span
                        style="cursor: move"
                        class="option-handle iconfont icon-yidongshu"
                      ></span>
                    </el-col>
                    <el-col :span="10">
                      <el-input size="mini" v-model="element.label" />
                    </el-col>
                    <el-col :span="10">
                      <el-input
                        size="mini"
                        type="number"
                        v-model="element.value"
                      />
                    </el-col>
                    <el-col :span="2">
                      <span
                        class="iconfont icon-delete"
                        @click="removeOption(index)"
                      ></span>
                    </el-col>
                  </el-row>
                </template>
              </draggable>
              <div style="text-align: right">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  circle
                  @click="addOption"
                ></el-button>
              </div>
            </el-form-item>

            <el-form-item
              label="必填:"
              v-if="dataProp.comp_type == ElementGroup.basic"
            >
              <el-switch v-model="dataProp.options.required"></el-switch>
            </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>
      <el-tab-pane label="表单属性" name="panel">
        <el-form size="small" :model="formProp" label-width="80px">
          <el-form-item label="面板大小:">
            <el-select v-model="formProp.size" placeholder="请选择活动区域">
              <el-option label="Medium" value="medium"></el-option>
              <el-option label="Small" value="small"></el-option>
              <el-option label="Mini" value="mini"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标签位置:">
            <el-select
              v-model="formProp.position"
              placeholder="表单域标签的位置"
            >
              <el-option label="Right" value="right"></el-option>
              <el-option label="Left" value="left"></el-option>
              <el-option label="Top" value="top"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标签宽度:">
            <el-input v-model="formProp.labelWidth" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed, PropType } from "vue";
import draggable from "vuedraggable";
import { ElementGroup, ElementTypes, ElementItem, PageOptions } from "./config";

export default defineComponent({
  components: { draggable },
  props: {
    data: {
      type: Object as PropType<ElementItem>,
      default: () => {
        return {};
      }
    },
    active: {
      type: String as PropType<string>,
      default: () => {
        return "element";
      }
    },
    form: {
      type: Object as PropType<PageOptions>,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    addOption() {
      let val: number = this.dataProp.options.options.length + 1;
      this.dataProp.options.options.push({
        label: `选项${val}`,
        value: val
      });
    },
    removeOption(index: number) {
      this.dataProp.options.options.splice(index, 1);
    }
  },
  async setup(props, { emit }) {
    const activeName = computed<String>({
      get: () => props.active,
      set: val => emit("update:active", val)
    });

    const formProp = computed<PageOptions>({
      get: () => props.form || {},
      set: val => emit("update:form", val)
    });

    const dataProp = computed<ElementItem>({
      get: () => props.data || {},
      set: val => emit("update:data", val)
    });

    return { activeName, formProp, dataProp, ElementGroup, ElementTypes };
  }
});
</script>

<style lang="scss" scoped>
.option-row {
  line-height: 36px;
  i {
    cursor: pointer;
  }
}
</style>
