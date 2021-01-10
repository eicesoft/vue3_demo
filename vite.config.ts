import path from "path";
import { UserConfigExport, ConfigEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
import dynamicImport from "vite-plugin-import-context";

//https://github.com/anncwb/vue-vben-admin

const sharedConfig = {
  alias: {
    "/@/": `${path.resolve(__dirname, "src")}/`,
    "/#/": `${path.resolve(__dirname, "src/assets")}/`
  }
};

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    ...sharedConfig,
    plugins: [
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
        watchFiles: true
      }),
      vue(),
      dynamicImport()
    ]
    // transforms: [require("vite-transform-globby-import")(sharedConfig)]
  };
};
