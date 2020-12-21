import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "/@/layouts/Main.vue";
import EmptyLayout from "/@/layouts/Empty.vue";

/**
 * path: menu.path,
              redirect: sub_router.path,
              component: () => MainLayout,
              meta: {
                title: sub_router.meta?.title
              },
              children: [
                {
                  name: menu.name + "." + sub_router.name,
                  path: sub_router.path,
                  component: () =>
                    import("/@/views/" + sub_router.component + ".vue")
                }
              ]
 */
let routes = [
  {
    path: "/",
    redirect: "/home",
    name: "name",
    component: () => MainLayout,
    meta: {
      title: "首页"
    },
    children: [
      {
        displayName: "name",
        path: "/home",
        component: () => import("/@/views/Home.vue")
      }
    ]
  },
  {
    path: "/",
    redirect: "/login",
    name: "login",
    component: () => EmptyLayout,
    meta: {
      title: "登录页"
    },
    children: [
      {
        displayName: "login",
        path: "/login",
        component: () => import("/@/views/Login.vue")
      }
    ]
  }
  // {
  //   path: "/",
  //   name: "setting",
  //   redirect: "/home",
  //   component: () => MainLayout,
  //   meta: {
  //     title: "设置页"
  //   },
  //   children: [
  //     {
  //       displayName: "setting",
  //       path: "/setting",
  //       component: () => import("/@/views/Setting.vue")
  //     }
  //   ]
  // }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
