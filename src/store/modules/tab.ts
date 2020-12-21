import router from "/@/routers";

/**
 *
 */
export interface Tab {
  name?: String;
  is_active?: Boolean;
  path?: String;
}

/**
 *
 */
export interface TabState {
  tabs?: Tab[];
}

const TabStore = {
  namespaced: true,
  state: () => ({
    tabs: [] as Tab[]
  }),
  mutations: {
    ADD_TAB(state: TabState, tab: Tab) {
      let exist = false;
      let index;
      for (let i in state.tabs) {
        state.tabs[i].is_active = false;

        if (state.tabs[i].path == tab.path) {
          exist = true;
          index = i;
        }
      }
      if (!exist) state.tabs.push(tab);
      else state.tabs[index].is_active = true;
    },
    CLOSE_TAB(state: TabState, tab: Tab) {
      let index;
      for (let i in state.tabs) {
        if (state.tabs[i].path == tab.path) {
          index = i;
        }
      }
      state.tabs.splice(index, 1);
      if (tab.is_active) {
        state.tabs[0].is_active = true;
        router.push(state.tabs[0].path);
      }
    },
    CLICK_TAB(state: TabState, tab: Tab) {
      for (let t of state.tabs) {
        if (t.path == tab.path) {
          t.is_active = true;
        } else {
          t.is_active = false;
        }
      }
      router.push(tab.path);
    }
  },
  getters: {
    all_tabs(state: TabState): Tab[] {
      return state.tabs;
    }
  },
  actions: {
    add({ commit }, tab: Tab) {
      commit("ADD_TAB", tab);
    },
    close({ commit }, tab: Tab) {
      commit("CLOSE_TAB", tab);
    },
    click({ commit }, tab: Tab) {
      commit("CLICK_TAB", tab);
    }
  }
};

export default TabStore;
