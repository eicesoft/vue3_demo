import mitt from "mitt";

const emitter: mitt.Emitter = mitt();

export function $emit(eventName: String, params: object) {
  emitter.emit(eventName, params);
}

export function $on(eventName: String, callback: Function) {
  emitter.on(eventName, params => {
    callback(params);
  });
}

export function $clear() {
  emitter.all.clear();
}

// export const useEventbus = () => {
//   // onUnmounted(() => {
//   //   emitter.all.clear();
//   // });

//   return {
//     $emit,
//     $on,
//     $clear
//   };
// };
