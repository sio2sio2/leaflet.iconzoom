// webpack/webpack.common.js
const webpack = require("webpack"),
      merge = require("webpack-merge"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
   let filename;

   switch(env.output) {
      case "min":
      case "debug":
         filename = "[name].js";
         break;
      case "src":
         filename = "[name]-src.js";
         break
      default:
         filename = `[name].${env.output}.js`;
   }

   const config = {
      entry: {
         "leaflet.iconzoom": ["./src/index.js"]
      },
      output: {
         filename: filename
      },
      plugins: [
         new webpack.ProvidePlugin({
            L: "leaflet"
         })
      ]
   }

   if(env.output === "bundle") {
      config.entry["leaflet.iconzoom"].push("leaflet/dist/leaflet.css");
      return merge(config, {
         module: {
            rules: [
               {
                  test: /\.css$/,
                  use: [MiniCssExtractPlugin.loader,
                        "css-loader"]
               },
               {
                  test: /\.(png|jpe?g|gif|svg)$/i,
                  use: [
                     'url-loader?limit=4096&name=images/[name].[ext]'
                  ]
               }
            ]
         },
         plugins: [
            new MiniCssExtractPlugin({
               filename: "[name].bundle.css",
               chunkFilename: "[id].css"
            })
         ]
      });
   }
   else {
      return merge(config, {
         externals: {
            leaflet: {
               root: "L",
               amd: "leaflet",
               commonjs: "leaflet",
               commonjs2: "leaflet"
            }
         },
         output: {
            filename: filename,
            libraryTarget: "umd",
            umdNamedDefine: true,
            library: "Lcz"
         }
      });
   }
}
