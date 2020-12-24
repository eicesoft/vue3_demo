import http from "/@/utils/http";

interface ActionInterface {
  [propName: string]: any;
}

/**
 * 动态生成方法, 导出接口函数
 * @param {object} actions
 * 直接import userApi from "/@/api";
 * let res = await userApi.getUserInfo(params)  调用
 */
export default function toActions(actions: any) {
  let export_funcs: ActionInterface = {};

  for (let key in actions) {
    let action = actions[key];
    const info = action.split(" ");
    if (info.length == 2) {
      let method = info[0],
        uri = info[1];
      export_funcs[key] = (params: object) => {
        return http.request({
          url: uri,
          method: method,
          params
        });
      };
    }
  }

  return export_funcs;
}
