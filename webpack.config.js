const path = require("path");
const { presets } = require("./babel.config");

const mailgoRules = [
  {
    test: /\.tsx?$/,
    include: path.resolve(__dirname, "./src/"),
    use: [
      "ts-loader",
      /*{
        loader: "babel-loader",
        options: {
          presets: presets,
        },
      },*/
    ],
    exclude: /node_modules/,
  },
  {
    test: /\.s[ac]ss$/i,
    use: ["to-string-loader", "css-loader", "sass-loader"],
  },
];

module.exports = [
  {
    mode: "production",
    target: "web",
    entry: "./mailgo.dist.ts",
    context: path.join(__dirname, "webpack"),
    module: {
      rules: mailgoRules,
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "mailgo.min.js",
      library: "mailgo",
      libraryTarget: "window",
      path: path.resolve(__dirname, "dist"),
    },
  },
  {
    mode: "production",
    target: "web",
    entry: "./mailgo.dist.ts",
    context: path.join(__dirname, "webpack"),
    module: {
      rules: mailgoRules,
    },
    optimization: {
      minimize: false,
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "mailgo.js",
      library: "mailgo",
      libraryTarget: "window",
      path: path.resolve(__dirname, "dist"),
    },
  },
  {
    mode: "production",
    target: "node",
    entry: "./mailgo.lib.ts",
    context: path.join(__dirname, "webpack"),
    module: {
      rules: mailgoRules,
    },
    optimization: {
      minimize: false,
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "lib/mailgo.js",
      library: "mailgo",
      libraryTarget: "umd",
      libraryExport: "default",
      globalObject: "typeof self !== 'undefined' ? self : this",
      path: path.resolve(__dirname),
    },
  },
];
