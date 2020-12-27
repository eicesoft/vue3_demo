import { createStore } from "vuex";
import { userStore, tabStore, errorStore, pageStore } from "./modules/index";

export const store = createStore({
  modules: {
    [userStore.name]: userStore,
    [tabStore.name]: tabStore,
    [errorStore.name]: errorStore,
    [pageStore.name]: pageStore
  }
});
