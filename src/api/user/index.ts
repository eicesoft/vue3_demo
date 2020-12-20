import http from "/@/utils/http";
import { RequestEnum } from "/@/utils/http/enum";

/**
 * 登录
 * @param params
 */
export function doLogin(params: Object) {
  return http.request({
    url: "/login",
    method: RequestEnum.POST,
    params
  });
}

/**
 * 测试
 * @param params
 */
export function test(params: Object) {
  return http.request({
    url: "/test",
    method: RequestEnum.GET,
    params
  });
}
