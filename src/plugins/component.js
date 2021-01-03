import PreviewFormItem from "/@/components/FormMarker/PreviewFormItem.vue";
import PreviewForm from "/@/components/FormMarker/PreviewForm.vue";

import FormView from "/@/components/FormMarker/FormView.vue";
import FormItemView from "/@/components/FormMarker/FormItemView.vue";

import RouterTransition from "/@/components/RouterTransition.vue";

export default app => {
  app.component(PreviewForm.name, PreviewForm);
  app.component(PreviewFormItem.name, PreviewFormItem);
  app.component(FormView.name, FormView);
  app.component(FormItemView.name, FormItemView);

  app.component(RouterTransition.name, RouterTransition);
};
