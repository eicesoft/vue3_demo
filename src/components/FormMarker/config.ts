export const Configs = {
  components: {
    basic: {
      label: "基础字段",
      list: [
        {
          type: "input",
          label: "输入框",
          icon: "icon-input",
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
      list: []
    },
    layout: {
      label: "布局字段",
      list: []
    }
  }
};
