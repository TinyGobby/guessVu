const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/[name].js'
  },
  devServer: {
    contentBase: './dist',
    proxy: {
      '/': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css)$/,
        use: [{
          loader: "style-loader"
        },  {
          loader: "css-loader",
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }]
      }
    ]},
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ]
}
