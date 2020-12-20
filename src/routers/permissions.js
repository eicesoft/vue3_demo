import router from "./index";
import NProgress from "nprogress"; // progress bar

async function canUserAccess(to, from) {
  return new Promise((resolve, reject) => {
    console.log("Can: ", to);
    resolve(true);
  });
}

router.beforeEach(async (to, from) => {
  NProgress.start();
  let status = await canUserAccess(to, from);
  NProgress.done();

  return status;
});
