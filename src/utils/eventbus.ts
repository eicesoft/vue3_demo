import mitt from "mitt";

const emitter: mitt.Emitter = mitt();

const $emit = (eventName: String, params: Object) => {
  emitter.emit(eventName, params);
};

// 自定义接收器
const $on = (eventName: String, callback: Function) => {
  emitter.on(eventName, params => {
    callback(params);
  });
};

const $clear = () => {
  emitter.all.clear();
};

export const useEventbus = () => {
  // onUnmounted(() => {
  //   emitter.all.clear();
  // });

  return {
    $emit,
    $on,
    $clear
  };
};
