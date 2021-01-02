<template>
  <div v-for="(comps, key) in tools">
    <div class="comp-title">{{ comps.label }}</div>

    <draggable
      class="comp-item"
      v-model="comps.list"
      :group="{ name: 'element', pull: 'clone', put: false }"
      :clone="cloneElement"
      item-key="type"
    >
      <template #item="{ element }">
        <div class="element-comp">
          <span class="iconfont" :class="element.icon"></span>
          {{ element.label }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import draggable from "vuedraggable";
const { uniqueId, cloneDeep } = window.$_;

export default defineComponent({
  components: { draggable },
  methods: {
    cloneElement(item) {
      let clone_item = cloneDeep(item);
      clone_item["label"] = item["label"] + "_" + ++this.elementId;
      clone_item["key"] = uniqueId("ele_" + new Date().getTime() + "_");
      clone_item["comp_type"] = this.ComponentTypes[item.type];
      // console.log(clone_item);

      return clone_item;
    }
  },
  props: {
    tools: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ComponentTypes = computed(() => {
      const CompKeys = {};
      for (let key in props.tools) {
        let comps = props.tools[key];
        for (let comp of comps.list) {
          CompKeys[comp.type] = key;
        }
      }

      return CompKeys;
    });

    const elementId = ref(0);

    return { ComponentTypes, elementId };
  }
});
</script>

<style lang="scss" scoped>
$active_color: #409eff;

.comp-title {
  margin: 4px 2px;
  font-size: 15px;
  padding: 0 4px;
  border-left: 4px solid rgb(52, 123, 255);
}

.comp-item {
  display: flex;
  .element-comp {
    border: 1px solid #919191;
    margin: 4px;
    padding: 4px 6px;
    border-radius: 2px;
    cursor: move;
    &:hover {
      border: 1px solid $active_color;
      color: $active_color;
    }
  }
}
</style>
