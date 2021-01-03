import { resolve } from "path";
import { createMockServer } from "vite-plugin-mock";
import { UserConfig } from "vite";
//https://github.com/anncwb/vue-vben-admin
function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}

const root: string = process.cwd();

const alias: Record<string, string> = {
  "/@/": pathResolve("src"),
  "/#/": pathResolve("src/components")
};

const config: UserConfig = {
  root,
  alias,
  plugins: [
    createMockServer({
      mockPath: "mock",
      watchFiles: true
    })
  ]
};

export default config;
