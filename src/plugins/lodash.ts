import _ from "lodash";
import { App, Plugin } from "vue";

// const lodashInstall = (app: App) => {
//   return {
//     install: (app: App, options: any) => {
//       console.log(">>>>>>>>>>", _);
//       app.config.globalProperties.$_ = () => {
//         return _;
//       };
//     }
//   };
// };
// console.log("=======", lodashInstall().install);

export const plugins: Plugin = {
  install(app: App, options) {
    // app.provide("lodash", _);
    // console.log(">>>>>>>>>>", _);
    // app.config.globalProperties.$_ = _;
    window.$_ = _;
  }
};
