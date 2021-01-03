<template>
  <template v-if="data.comp_type == ElementGroup.basic">
    <el-form-item
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

      <template v-if="data.type == ElementTypes.textarea">
        <el-input
          type="textarea"
          v-model="model"
          :rows="data.options.rows"
          :placeholder="data.options.placeholder"
        ></el-input>
      </template>

      <template v-else-if="data.type == ElementTypes.radio">
        <el-radio-group v-model="model">
          <el-radio
            v-for="item in data.options.options"
            :label="item.value"
            :key="item.key"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </template>

      <template v-else-if="data.type == ElementTypes.checkbox">
        <el-checkbox-group v-model="model">
          <el-checkbox
            v-for="item in data.options.options"
            :label="item.value"
            :key="item.key"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </template>

      <template v-if="data.type == ElementTypes.select">
        <el-select v-model="model" :placeholder="data.options.placeholder">
          <el-option
            v-for="item in data.options.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </el-form-item>
  </template>

  <template v-else-if="data.comp_type == ElementGroup.view">
    <template v-if="data.type == ElementTypes.divider">
      <el-divider content-position="left">
        {{ data.label }}
      </el-divider>
    </template>
  </template>

  <template v-else-if="data.comp_type == ElementGroup.layout">
    <template v-if="data.type == ElementTypes.grid">
      <el-row>
        <el-col :span="col.span" v-for="col in data.columns" :key="col.key">
          <FormItemView
            @change="changeModel"
            v-for="item in col.list"
            :key="item.key"
            :data="item"
          ></FormItemView>
        </el-col>
      </el-row>
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
import { ElementGroup, ElementTypes, ElementItem } from "./config";

export default defineComponent({
  name: "FormItemView",
  emits: ["change"],
  props: {
    data: {
      type: Object as PropType<ElementItem>,
      required: true
    }
  },
  methods: {
    changeModel(data, value) {
      this.$emit("change", data, value);
    }
  },
  setup(props, { emit }) {
    console.log(props);
    const model = ref<any>();

    if (props.data.type === ElementTypes.checkbox) {
      model.value = [];
    }

    watch(model, value => {
      emit("change", props.data, value);
    });

    return { model, ElementGroup, ElementTypes };
  }
});
</script>

<style lang="scss" scoped></style>
