import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["bin/cli"],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
});
