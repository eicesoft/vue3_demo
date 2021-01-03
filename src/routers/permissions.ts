import { defineAsyncComponent, markRaw } from "vue";
import router from "./index";
import NProgress from "nprogress"; // progress bar
import { store } from "/@/store";
import MainLayout from "/@/layouts/Main.vue";

const routesWhiteList = ["/login", "/404", "/401", "/500"];

async function canUserAccess(to, from) {
  return new Promise((resolve, reject) => {
    // console.log("Can: ", to);
    resolve(true);
  });
}

router.beforeResolve(async (to, from, next) => {
  const hasPermissions =
    store.getters["user/menus"] && store.getters["user/menus"].length > 0;
  // console.log(store.getters["user/menus"], hasPermissions);
  const token = store.getters["user/token"];
  // console.log(to);

  // console.log(token);
  if (token) {
    if (to.path === "/login") {
      next({
        path: "/home"
      });
    } else {
      if (hasPermissions) {
        next();
      } else {
        const { menus } = await store.dispatch("user/getInfo");
        // console.log(menus);

        for (let menu of menus) {
          for (let sub_router of menu.children) {
            // console.log(sub_router.component);
            const path = `/@/views/${sub_router.component}.vue`;
            let route = {
              path: menu.path,
              redirect: sub_router.path,
              component: markRaw(MainLayout),
              meta: {
                title: sub_router.meta?.title
              },
              children: [
                {
                  name: menu.name + "." + sub_router.name,
                  path: sub_router.path,
                  component: () => defineAsyncComponent(() => import(path))
                }
              ]
            };
            // console.log(route);
            router.addRoute(route);
          }
        }

        next({
          ...to,
          replace: true
        });
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }

  // next({
  //   ...to,
  //   replace: true
  // });
  // next();
});

router.beforeEach(async (to, from) => {
  NProgress.start();

  let status = await canUserAccess(to, from);
  NProgress.done();

  return status;
});
