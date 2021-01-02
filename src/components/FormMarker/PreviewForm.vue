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
import { defineComponent, ref, computed } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "PreviewForm",
  components: { draggable },
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    selectElementHandler(element) {
      this.selectElement = element;
      this.$emit("select", element);
    },
    removeElementHandler(index) {
      this.$emit("remove", index);
    }
  },
  setup(props, { emit }) {
    const selectElement = ref({});
    const nodes = computed({
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
  min-height: 20px;
  // width: 100%;
}
</style>
