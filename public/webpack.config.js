const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: {
    app: './index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      name: 'Offline Online Budget Tracker app',
      short_name: 'Budget Tracker',
      description: 'An application that allows you to add expenses and deposits to their budget with or without a connection.',
      background_color: '#01579b',
      theme_color: '#ffffff',
      'theme-color': '#ffffff',
      start_url: '/',
      icons: [
        {
          src: path.resolve('icons/icon-512x512.png'),
          sizes: [192, 512],
          destination: path.join('icons'),
        },
      ],
    }),
  ],
};

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
      // the name of the generated manifest file
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
