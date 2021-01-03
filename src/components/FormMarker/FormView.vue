<template>
  <el-form
    :label-position="config.position"
    :label-width="config.labelWidth"
    :model="formModel"
    :size="config.size"
    ref="form"
  >
    <FormItemView
      @change="changeModel"
      v-for="item in data"
      :key="item.key"
      :data="item"
    ></FormItemView>
    <el-form></el-form>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, unref, PropType } from "vue";
import { ElementItem, PageOptions } from "./config";

const builderModel = (list: ElementItem[]) => {
  let model = {};
  for (let item of list) {
    model[item.key] = "";
  }

  return reactive(model);
};

export default defineComponent({
  name: "FormView",
  components: {},
  props: {
    data: {
      type: Object as PropType<ElementItem[]>,
      required: true
    },
    config: {
      type: Object as PropType<PageOptions>,
      defaultd: () => {
        return {
          size: "small",
          position: "left",
          labelWidth: "100px"
        };
      }
    }
  },
  methods: {
    getData() {
      const data = unref(this.formModel);

      return data;
    },
    changeModel(item, value) {
      this.formModel[item.key] = value;
    }
  },
  setup(props) {
    const formModel = reactive(builderModel(props.data as ElementItem[]));

    return { formModel };
  }
});
</script>

<style lang="scss" scoped></style>

<style lang="scss"></style>
