import { createStore } from "vuex";
// import { config } from "vuex-module-decorators";
// import { userStore, tabStore, pageStore } from "./modules/index";
// import { PageStore } from "./modules/page";

// import * as stores from "globby!/@/store/modules/**.ts";

export interface Store {
  name?: string;
  actions?: object;
  getters?: object;
  mutations: object;
  namespaced?: boolean;
}

let modules = {};

const modules_stores = importContext({
  dir: "/@/store/modules",
  deep: true,
  regexp: /\.ts$/,
  dynamicImport: false,
  ignoreCurrentFile: true
});
// console.dir(modules_stores);
modules_stores.keys().forEach((key: string) => {
  let store: Store = modules_stores(key).default;
  if (store != null && store.name && store.namespaced) {
    modules[store.name] = store;
  }
  // console.log("nextMain=>", modules_stores(key));
});

// config.rawError = true;

// export interface IRootState {
//   user: userStore;
//   tab: tabStore;
//   // error: errorStore;
//   page: PageStore;
// }

// export default createStore<IRootState>({});

export const store = createStore({
  modules
});
