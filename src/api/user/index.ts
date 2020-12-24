import toActions from "/@/utils/http/action";

/**
 * 接口列表
 */
const Routers = {
  login: "POST /login", //登录
  getUserInfo: "GET /info" //获得登录用户信息
};

export default toActions(Routers);
