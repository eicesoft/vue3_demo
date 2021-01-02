import { createApp, nextTick } from "vue";
import router from "./routers";
import { store } from "./store";
import "./routers/permissions";

import App from "./App.vue";
import "./style/index.scss";
import "nprogress/nprogress.css"; // 进度条样式
import "./icon-fonts/iconfont.css"; // 进度条样式

import installElementPlus from "./plugins/element";
import installComponent from "./plugins/component";
import Clipboard from "v-clipboard3";

import { plugins } from "./plugins/lodash";
import { Config } from "./utils/config";

const { host } = Config;
console.log(host);
const app = createApp(App);

app.use(router);
app.use(store);
app.use(plugins);
app.use(Clipboard);

installComponent(app);
installElementPlus(app);

app.mount("#app");
