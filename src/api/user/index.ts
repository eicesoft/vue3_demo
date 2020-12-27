import { toActions } from "/@/utils/http/action";

export default toActions({
  login: "POST /login", //登录
  getUserInfo: "GET /info" //获得登录用户信息
});
