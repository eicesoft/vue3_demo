import { createStore } from "vuex";
import userStore from "./modules/user";
import tabStore from "./modules/tab";

export const store = createStore({
  modules: {
    user: userStore,
    tab: tabStore
  }
});
