import { createApp } from "vue";
import router from "/@/routers";
import store from "/@/store";

import App from "/@/App.vue";
import "./style/index.scss";
import installElementPlus from './plugins/element'

const app = createApp(App);

app.use(store);
app.use(router);
installElementPlus(app)

app.mount("#app");
