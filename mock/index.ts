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
            token: "sdagsadhadshsadhasdh23sdfsadgsdghs"
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
    url: "/api/info",
    method: "get",
    response: ({ body }) => {
      return {
        code: 200,
        data: {
          user: {
            name: "Kelezyb"
          },
          menus: [
            {
              name: "rbac",
              path: "/",
              meta: {
                title: "权限管理",
                icon: "el-icon-user"
              },
              children: [
                {
                  name: "menu",
                  meta: {
                    title: "菜单管理",
                    icon: ""
                  },
                  path: "/menu",
                  component: "rbac/menu"
                },
                {
                  name: "permissions",
                  meta: {
                    title: "权限管理",
                    icon: ""
                  },
                  path: "/permissions",
                  component: "rbac/permissions"
                },
                {
                  name: "role",
                  meta: {
                    title: "角色管理",
                    icon: ""
                  },
                  path: "/role",
                  component: "rbac/role"
                },
                {
                  name: "user",
                  meta: {
                    title: "用户管理",
                    icon: ""
                  },
                  path: "/user",
                  component: "rbac/user"
                }
              ]
            },

            {
              name: "test2",
              path: "/test2",
              meta: {
                title: "测试系统",
                icon: "el-icon-user"
              },
              children: [
                {
                  name: "menu2",
                  meta: {
                    title: "菜单管理",
                    icon: ""
                  },
                  path: "/menu2",
                  component: "rbac/menu"
                },
                {
                  name: "permissions2",
                  meta: {
                    title: "权限管理",
                    icon: ""
                  },
                  path: "/permissions2",
                  component: "rbac/permissions"
                },
                {
                  name: "role2",
                  meta: {
                    title: "角色管理",
                    icon: ""
                  },
                  path: "/role2",
                  component: "rbac/role"
                },
                {
                  name: "user2",
                  meta: {
                    title: "用户管理",
                    icon: ""
                  },
                  path: "/user2",
                  component: "rbac/user"
                }
              ]
            },

            {
              name: "test",
              path: "/test",
              meta: {
                title: "测试demo",
                icon: "el-icon-share"
              },
              children: [
                {
                  name: "index",
                  meta: {
                    title: "Home",
                    icon: ""
                  },
                  path: "/home",
                  component: "Home"
                },
                {
                  name: "setting",
                  meta: {
                    title: "Setting",
                    icon: ""
                  },
                  path: "/setting",
                  component: "Setting"
                }
              ]
            }
          ],
          permissions: []
        },
        message: ""
      };
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
  },
  {
    url: "/api/filter/list",
    method: "get",
    response: {
      code: 200,
      data: [
        {
          id: 1,
          label: "测试1",
          module: "test",
          query: "{}"
        },
        {
          id: 2,
          label: "测试2",
          module: "test",
          query: "{}"
        }
      ],
      message: ""
    }
  }
] as MockMethod[];
