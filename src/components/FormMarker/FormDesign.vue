<template>
  <div class="form-design">
    <el-container style="height: 100%">
      <el-aside width="200px">
        <ToolPanel :tools="components"></ToolPanel>
      </el-aside>
      <el-container>
        <el-header>
          <el-button
            @click="previewShow"
            size="mini"
            round
            icon="el-icon-mobile-phone"
            type="success"
          >
            预览
          </el-button>

          <el-button size="mini" round icon="el-icon-top">导入配置</el-button>
          <el-button
            size="mini"
            round
            icon="el-icon-files"
            type="primary"
            @click="exportShow"
          >
            导出配置
          </el-button>

          <el-popconfirm
            @confirm="clear"
            title="确定删除所有的组件么"
            icon="el-icon-question"
            confirmButtonText="确认"
            cancelButtonText="取消"
          >
            <template #reference>
              <el-button type="danger" size="mini" round icon="el-icon-delete">
                清除数据
              </el-button>
            </template>
          </el-popconfirm>
        </el-header>
        <el-main>
          <el-form
            :labelPosition="form.position"
            :label-width="form.labelWidth"
            :size="form.size"
          >
            <PreviewForm
              @select="changeCurrentSelect"
              @remove="removeElement"
              v-model:list="elementList"
            ></PreviewForm>
          </el-form>
          {{ form }}
        </el-main>
      </el-container>

      <el-aside class="element-prepertie">
        <ElementPropertie
          v-model:active="elementTab"
          v-model:form="form"
          v-model:data="selectElement"
        ></ElementPropertie>
      </el-aside>
    </el-container>

    <el-dialog
      title="动态表单 (FormBuilder) 预览"
      v-model="previewDialog"
      width="80%"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <FormView ref="view" :data="elementList" :config="form"></FormView>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="mini" round @click="previewDialog = false">
            关闭
          </el-button>
          <el-button size="mini" round type="primary" @click="getFormValues">
            获取表单值
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      title="导出配置"
      v-model="exportDialog"
      width="40%"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-input
        type="textarea"
        class="copy_area"
        :rows="8"
        v-model="exportConfig"
        readonly
      ></el-input>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="mini" round @click="exportDialog = false">
            关闭
          </el-button>
          <el-button
            v-clipboard:copy="exportConfig"
            v-clipboard:success="copyCode"
            size="mini"
            round
            type="primary"
          >
            拷贝
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs } from "vue";
import draggable from "vuedraggable";
import { Configs, ElementItem } from "./config";
import { ElementPropertie, ToolPanel } from "./index";

export default defineComponent({
  name: "form_design",
  components: {
    draggable,
    ElementPropertie,
    ToolPanel
  },
  methods: {
    clear() {
      this.elementList = [];
      this.selectElement = new Object();
      this.$message.success({ message: "清除数据成功", type: "success" });
    },
    changeCurrentSelect(element: any) {
      this.elementTab = "element";
      this.selectElement = element;
      console.log(element);
    },
    removeElement(index: number) {
      //删除当前选择项, 清除选择项
      if (this.elementList[index].key === this.selectElement.key) {
        this.selectElement = new Object();
      }
      this.elementList.splice(index, 1);
    },
    previewShow() {
      this.previewDialog = true;
    },
    exportShow() {
      this.exportDialog = true;
    },
    getFormValues() {
      const msg = JSON.stringify(this.$refs.view.getData());
      this.$alert(msg, "表单内容");
    },
    copyCode() {
      this.$message.success("复制成功");
    }
  },
  async setup(props) {
    const elementList = ref<ElementItem[]>([]);
    const selectElement = ref<ElementItem>({
      options: {}
    });
    const elementTab = ref<String>("element");
    const dialogVisible = reactive({
      previewDialog: false,
      exportDialog: false,
      importDialog: false
    });
    const configs = reactive(Configs);

    const exportConfig = computed<String>(() => {
      return JSON.stringify({
        list: elementList.value,
        form: configs.form
      });
    });

    return {
      ...toRefs(configs),
      ...toRefs(dialogVisible),
      elementList,
      selectElement,
      elementTab,
      exportConfig
    };
  }
});
</script>

<style lang="scss" scoped>
.el-header {
  color: #333;
  text-align: right;
  height: auto !important;
  padding: 4px 10px;
  border-bottom: 1px solid #ececec;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
}

.el-main {
  color: #333;

  .element-prepertie {
    width: 200px;
    border-left: 1px solid #ececec;
    border-right: 0px;
    padding: 0px 8px;
  }
}

.dialog-footer {
  text-align: center;
}
</style>
