import { store } from "/@/store";

/**
 *
 */
export interface IPageStore {
  title?: string;
}

const pageStore = {
  name: "page",
  namespaced: true,
  state: () => ({
    title: ""
  }),
  mutations: {
    SET_TITLE(state: IPageStore, title: string) {
      console.log("Set Title: " + title);

      state.title = title;
    }
  },
  getters: {
    title(state: IPageStore): string {
      return state.title;
    }
  },
  actions: {
    setTitle({ commit }, title: string) {
      commit("SET_TITLE", title);
    }
  }
};

export default pageStore;
