// webpack/webpack.development.js
const merge = require('webpack-merge'),
      CopyPlugin = require('copy-webpack-plugin'),
      webpack = require("webpack");

module.exports = env => {
   const common = require('./webpack.common.js')(env);
   let filenamemap = `${common.output.filename}.map`;
   if(env.output === "debug") filenamemap = `dist/${filenamemap}`;

   const config = {
      mode: "development",
      devtool: false,
      devServer: {
         contentBase: false,
         open: "chromium",
         //openPage: "index.html"
      },
      plugins: [
         new webpack.SourceMapDevToolPlugin({
            filename: filenamemap
         })
      ]
   };

   const config_extra = env.output !== "debug"?{}:
      {
         output: {
            filename: `dist/${common.output.filename}`
         },
         plugins: [
            new CopyPlugin([
               {from: "examples", to: ".", ignore: ["*.swp"] }
            ])
         ]
      }

   return merge(common, config, config_extra);

}
