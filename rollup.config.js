import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import clear from "rollup-plugin-clear";
import { rollup } from "rollup";
import scss from "rollup-plugin-scss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "rollup-plugin-json";

export default {
  // 输入
  input: "./src/main.js",
  // 输出
  output: {
    file: "./dist/bundle.js", //输出文件及位置
    format: "esm", //模块方式
    banner: "/* library version  */", //在代码块顶部展示头部信息
    footer: "/* library version  */", //在代码底部部展示
    name: "RollupLearn", //生成包名称，参数类型为String。
    sourcemap: true,
  },
  plugins: [
    //合并第三方库,告诉 Rollup 如何查找外部模块
    resolve(),
    //解决使用三方库，模块导入导出方式
    commonjs(),
    //解决es6以上代码兼容性问题的babel
    babel(),
    //处理json
    json(),
    // 代码压缩，去除注释
    terser(),
    serve({
      open: true, // 运行时自动打开浏览器
      headers: {
        "Access-Control-Allow-Origin": "*", // 本地服务允许跨域
      },
      contentBase: ["public", "."], // 本地服务的运行文件根目录
      port: 5000, // 设置网络服务监听端口
    }),
    // 清除目录
    clear({
      targets: ["dist"], // 项目打包编译生成的目录
      watch: true, // 实时监听文件变化
    }),
    // 预处理器
    rollup({
      entry: "main.js",
      plugins: [scss()],
    }),
  ],
  external: [""], //作用：指出应将哪些模块视为外部模块，否则会被打包进最终的代码里
};
