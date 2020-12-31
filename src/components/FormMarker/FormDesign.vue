<template>
  <el-container style="height: 100%">
    <el-aside width="200px">
      <div v-for="(comps, key) in components">
        {{ comps.label }}

        <ul>
          <Draggable tag="ul" v-model="comps.list" handle=".drag-item">
            <li class="drag-item" v-for="comp in comps.list">
              {{ comp.label }}
            </li>
          </Draggable>
        </ul>
      </div>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Draggable from "vuedraggable";
import { Configs } from "./config";
console.log(Configs);
export default defineComponent({
  name: "form_design",
  components: { Draggable },
  setup() {
    const { components } = Configs;
    return {
      components
    };
  }
});
</script>

<style></style>
