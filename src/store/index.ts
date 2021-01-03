import { createStore } from "vuex";
import { config } from "vuex-module-decorators";
import { userStore, tabStore, pageStore } from "./modules/index";
// import { PageStore } from "./modules/page";

config.rawError = true;

// export interface IRootState {
//   user: userStore;
//   tab: tabStore;
//   // error: errorStore;
//   page: PageStore;
// }

// export default createStore<IRootState>({});

export const store = createStore({
  modules: {
    [userStore.name]: userStore,
    [tabStore.name]: tabStore,
    // [errorStore.name]: errorStore,
    [pageStore.name]: pageStore
  }
});
