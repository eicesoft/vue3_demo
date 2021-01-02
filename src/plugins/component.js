// import { PreviewForm, PreviewFormItem } from "/@/components/FormMarker/index";
import PreviewFormItem from "/@/components/FormMarker/PreviewFormItem.vue";
import PreviewForm from "/@/components/FormMarker/PreviewForm.vue";

export default app => {
  app.component(PreviewForm.name, PreviewForm);
  app.component(PreviewFormItem.name, PreviewFormItem);
};
