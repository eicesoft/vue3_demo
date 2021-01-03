export enum ElementTypes {
  input = 1,
  textarea,
  radio,
  checkbox,
  select,
  divider,
  grid
}

export enum ElementGroup {
  basic = "basic",
  view = "view",
  layout = "layout"
}

export interface PageOptions {
  size?: "small" | "mini" | "medium";
  position?: "left" | "right" | "top";
  labelWidth?: string;
}

export interface ElementColummn {
  span?: number;
  list?: ElementItem[];
}

export interface ElementItemOption {
  width?: String;
  defaultValue?: any;
  required?: boolean;
  placeholder?: String;
  disabled?: boolean;
}

export interface ElementItem {
  type?: ElementTypes;
  comp_type?: ElementGroup;
  key?: String;
  label?: String;
  icon?: String;
  columns?: ElementColummn[];
  options?: ElementItemOption;
}

export const Configs = {
  components: {
    [ElementGroup.basic]: {
      label: "基础字段",
      list: [
        {
          type: ElementTypes.input,
          label: "输入框",
          icon: "icon-danhangshurukuang",
          options: {
            width: "100%",
            defaultValue: "",
            required: false,
            pattern: "",
            placeholder: "请输入内容",
            disabled: false
          }
        },
        {
          type: ElementTypes.textarea,
          label: "文本域",
          icon: "icon-28fuwenbenkuang",
          options: {
            width: "100%",
            defaultValue: "",
            rows: 6,
            required: false,
            dataType: "string",
            pattern: "",
            placeholder: "",
            disabled: false
          }
        },
        {
          type: ElementTypes.radio,
          label: "单选框",
          icon: "icon-radio",
          options: {
            defaultValue: null,
            options: [
              {
                label: "选项1",
                value: 1
              },
              {
                label: "选项2",
                value: 2
              }
            ],
            required: false,
            disabled: false
          }
        },
        {
          type: ElementTypes.checkbox,
          label: "多选框",
          icon: "icon-check-box-outline",
          options: {
            defaultValue: [],
            options: [
              {
                label: "选项1",
                value: 1
              },
              {
                label: "选项2",
                value: 2
              }
            ],
            required: false,
            disabled: false
          }
        },
        {
          type: ElementTypes.select,
          label: "下拉框",
          icon: "icon-xialakuang",
          options: {
            defaultValue: "",
            options: [
              {
                label: "选项1",
                value: 1
              },
              {
                label: "选项2",
                value: 2
              }
            ],
            mulitselect: false,
            required: false,
            disabled: false
          }
        }
      ]
    },
    [ElementGroup.view]: {
      label: "显示字段",
      list: [
        {
          type: ElementTypes.divider,
          label: "分割线",
          icon: "icon-slider",
          options: {}
        }
      ]
    },
    [ElementGroup.layout]: {
      label: "布局字段",
      list: [
        {
          type: ElementTypes.grid,
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
