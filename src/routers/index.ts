import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { markRaw } from "vue";

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
let routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    name: "name",
    component: markRaw(MainLayout),
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/home",
        component: () => import("/@/views/Home.vue")
      }
    ]
  },
  {
    path: "/",
    redirect: "/login",
    name: "login",
    component: markRaw(EmptyLayout),
    meta: {
      title: "登录页"
    },
    children: [
      {
        path: "/login",
        component: () => import("/@/views/Login.vue")
      }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
