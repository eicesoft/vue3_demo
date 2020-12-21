import { getUserInfo } from "/@/api/user";

export interface User {
  name?: String;
}

export interface UserState {
  menus?: any[];
  user?: User;
  permissions?: any[];
  token?: string;
}

const userStore = {
  namespaced: true,
  state: () => ({
    menus: [],
    user: {},
    permissions: [],
    token: localStorage.getItem("token")
  }),
  mutations: {
    SET_MENUS(state: UserState, menus: any[]) {
      state.menus = menus;
    },
    SET_USER(state: UserState, user: User) {
      state.user = user;
    },
    SET_PERMISSIONS(state: UserState, permissions: any[]) {
      state.permissions = permissions;
    },
    SET_TOKEN(state: UserState, token: string) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    LOGOUT(state: {
      token: string;
      menus: any[];
      permissions: any[];
      user: {};
    }) {
      localStorage.clear();
      state.token = "";
      state.menus = [];
      state.permissions = [];
      state.user = {};
    }
  },
  getters: {
    user(state: UserState) {
      return state.user;
    },
    menus(state: UserState) {
      return state.menus;
    },
    permissions(state: UserState) {
      return state.permissions;
    },
    token(state: { token: string }) {
      return state.token;
    }
  },
  actions: {
    setToken({ commit }, token: string) {
      commit("SET_TOKEN", token);
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    async getInfo({ commit }) {
      const { user, menus, permissions } = await getUserInfo();
      commit("SET_MENUS", menus);
      commit("SET_USER", user);
      commit("SET_PERMISSIONS", permissions);

      return {
        user,
        menus,
        permissions
      };
    }
  }
};

export default userStore;
