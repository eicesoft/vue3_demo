import router from "/@/routers";
import { store } from "/@/store";

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
  name: "tab",
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
    },
    CLOSE_ALL(state: TabState, flag: boolean) {
      console.log("CLOSE_ALL");
      let tab;
      for (let i in state.tabs) {
        if (state.tabs[i].is_active) {
          tab = state.tabs[i];
        }
      }

      state.tabs.splice(0);

      if (!flag) {
        state.tabs.push(tab);
      } else {
        store.commit("tab/ADD_TAB", {
          name: "首页",
          is_active: true,
          path: "/home"
        });
      }
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
    },
    close_all({ commit }, flag: boolean) {
      commit("CLOSE_ALL", flag);
    }
  }
};

export default TabStore;
