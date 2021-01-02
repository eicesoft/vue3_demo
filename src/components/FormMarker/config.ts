export const Configs = {
  components: {
    basic: {
      label: "基础字段",
      list: [
        {
          type: "input",
          label: "输入框",
          icon: "icon-danhangshurukuang",
          options: {
            width: "100%",
            defaultValue: "",
            required: false,
            dataType: "string",
            pattern: "",
            placeholder: "请输入内容",
            disabled: false
          }
        },
        {
          type: "textarea",
          label: "文本域",
          icon: "icon-28fuwenbenkuang",
          options: {
            width: "100%",
            defaultValue: "",
            required: false,
            dataType: "string",
            pattern: "",
            placeholder: "",
            disabled: false
          }
        }
      ]
    },
    view: {
      label: "显示字段",
      list: [
        {
          type: "divider",
          label: "分割线",
          icon: "icon-slider",
          options: {}
        }
      ]
    },
    layout: {
      label: "布局字段",
      list: [
        {
          type: "grid",
          label: "宫格布局",
          icon: "icon-grid",
          columns: [
            {
              span: 12,
              list: []
            },
            {
              span: 12,
              list: []
            }
          ],
          options: {}
        }
      ]
    }
  },
  form: {
    size: "small",
    position: "left",
    labelWidth: "100px"
  }
};
