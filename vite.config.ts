import { resolve } from "path";
import { createMockServer } from "vite-plugin-mock";
import { UserConfig } from "vite";

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}
const config: UserConfig = {
  alias: {
    "/@/": pathResolve("src"),
    "/#/": pathResolve("src/components")
  },
  plugins: [
    createMockServer({
      mockPath: "mock",
      watchFiles: true
    })
  ]
};

export default config;
