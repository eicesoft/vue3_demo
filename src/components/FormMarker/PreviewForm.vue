<template>
  <draggable
    class="dragArea list-group"
    handle=".handle"
    v-model:list="nodes"
    group="element"
    item-key="key"
  >
    <template #item="{ element, index }">
      <PreviewFormItem
        @select="selectElementHandler"
        @remove="removeElementHandler"
        :active="selectElement.key == element.key"
        :data="element"
        :index="index"
        :key="element.key"
      ></PreviewFormItem>
    </template>
  </draggable>
</template>
<script lang="ts">
import { defineComponent, ref, computed, PropType } from "vue";
import draggable from "vuedraggable";
import { ElementItem } from "./config";

export default defineComponent({
  name: "PreviewForm",
  components: { draggable },
  props: {
    list: {
      type: Array as PropType<ElementItem[]>
    }
  },
  methods: {
    selectElementHandler(element: ElementItem) {
      this.selectElement = element;
      this.$emit("select", element);
    },
    removeElementHandler(index: number) {
      this.$emit("remove", index);
    }
  },
  setup(props, { emit }) {
    const selectElement = ref<ElementItem>({});
    const nodes = computed<Array<ElementItem>>({
      get: () => props.list,
      set: val => {
        console.log(val);
        emit("update:list", val);
      }
    });
    return { selectElement, nodes };
  }
});
</script>
<style lang="scss" scoped>
.list-group {
  border: 1px dashed #ececec;
  padding: 4px;
  min-height: 100px;
}
</style>
