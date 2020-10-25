const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  mode: "production",
  entry: {
    index: "./public/index.js"
  },
  output: {
    path: __dirname + "/public/dist",
    filename: "[name].bundle.js"
  },
  plugins: [
    new WebpackPwaManifest({
      filename: "manifest.json",
      inject: false,
      fingerprints: false,
      name: "IndexBudget Tracker PWA",
      short_name: "Index Budget",
      theme_color: "#e6f542",
      background_color: "#e6f542",
      start_url: "/",
      display: "fullscreen",
      orientation: "landscape",
      icons: [
        {
          src: path.resolve(
            __dirname,
            "public/icons/icon-512x512.png"
          ),
          size: [72, 96, 128, 144, 152, 192, 384, 512]
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './public',
    publicPath: '/dist'
 }
};

module.exports = config;
