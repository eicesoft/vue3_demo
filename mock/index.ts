import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      console.log(body);
      if (body.username == "admin") {
        return {
          code: 200,
          data: {
            token: "sdagsadhadshsadhasdh23sdfsadgsdghs",
            user: {
              name: "Kelezyb"
            },
            menus: [],
            permissions: []
          },
          message: ""
        };
      } else {
        return {
          code: 500,
          data: {},
          message: "登录失败"
        };
      }
    }
  },
  {
    url: "/api/test",
    method: "get",
    response: {
      code: 200,
      data: {
        name: "vben"
      },
      message: ""
    }
  }
] as MockMethod[];
