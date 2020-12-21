import { createApp } from "vue";
import router from "./routers";
import { store } from "./store";
import "./routers/permissions";

import App from "./App.vue";
import "./style/index.scss";
import "nprogress/nprogress.css"; // 进度条样式

import installElementPlus from "./plugins/element";

const app = createApp(App);

app.use(router);
app.use(store);

installElementPlus(app);

app.mount("#app");
