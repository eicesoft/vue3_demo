import { store } from "/@/store";

/**
 *
 */
export interface Error {
  err?: any;
  vm?: any;
  info?: string;
}

/**
 *
 */
export interface IErrorStore {
  errors?: Error[];
}

const ErrorStore = {
  name: "error",
  namespaced: true,
  state: () => ({
    errors: [] as Error[]
  }),
  mutations: {
    ADD(state: IErrorStore, error: Error) {
      state.errors.push(error);
    },
    CLEAR(state: IErrorStore) {
      state.errors.splice(0);
    }
  },
  getters: {
    all(state: IErrorStore): Error[] {
      return state.errors;
    }
  },
  actions: {
    add({ commit }, error: Error) {
      commit("ADD", error);
    },
    clear({ commit }) {
      commit("CLEAR");
    }
  }
};

export default ErrorStore;
