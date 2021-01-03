// import { store } from "/@/store";
// console.log(store);
import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule
} from "vuex-module-decorators";

/**
 *
 */
export interface PageStore {
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

// export default pageStore;
const NAME = "page";
// @Module({ namespaced: true, name: NAME, dynamic: true, store })
class Page extends VuexModule {
  name: "page";

  constructor(props: any) {
    super(props);
    this.name = "page";
  }
  pageState: PageStore = {
    title: ""
  };

  get title() {
    return this.pageState.title;
  }

  @Mutation
  commitTitle(title: string): void {
    console.log("Set Title: " + title);

    this.pageState.title = title;
  }

  @Action
  setTitle(title: string): void {
    this.commitTitle(title);
  }
}
// const pageStore = getModule<Page>(Page);
export default pageStore;
