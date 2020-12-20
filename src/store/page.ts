import { reactive, provide, readonly, inject } from "vue";

const stateSymbol = Symbol("page");

const state = reactive({ title: "" });

/**
 * 设置标题
 * @param title
 */
const setTitle = title => {
  state.title = title;
};

const useProvide = () => {
  provide(stateSymbol, state);
};

const useState = () => inject(stateSymbol);

export default {
  stateSymbol, //state Symbol
  pageState: readonly(state), //页面状态
  setTitle,
  useProvide,
  useState
};
