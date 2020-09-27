import { esbuildPlugin } from "@web/dev-server-esbuild";

export default {
  plugins: [
    esbuildPlugin({ tsx: true, jsxFactory: "h", jsxFragment: "Fragment" }),
  ],
};
