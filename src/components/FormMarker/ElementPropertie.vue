<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="元件属性" name="element">
        {{ data }}

        <el-form size="small" :model="dataProp">
          <el-form-item label="Key:" v-if="dataProp.comp_type == 'basic'">
            <el-input v-model="dataProp.key" />
          </el-form-item>

          <el-form-item label="标签:">
            <el-input v-model="dataProp.label" />
          </el-form-item>

          <el-form-item label="Width:">
            <el-input v-model="dataProp.options.width" />
          </el-form-item>
        </el-form>
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
import { defineComponent, ref, reactive, watch, computed } from "vue";
export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    active: {
      type: String,
      default: () => {
        return "element";
      }
    },
    form: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props, { emit }) {
    const activeName = computed({
      get: () => props.active,
      set: val => emit("update:active", val)
    });

    const formProp = computed({
      get: () => props.form,
      set: val => emit("update:form", val)
    });

    const dataProp = computed({
      get: () => props.data,
      set: val => emit("update:data", val)
    });

    return { activeName, formProp, dataProp };
  }
});
</script>

<style></style>
