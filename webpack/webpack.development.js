// webpack/webpack.development.js
const merge = require('webpack-merge'),
      webpack = require("webpack");

module.exports = env => {
   const common = require('./webpack.common.js')(env);
   let filenamemap = `${common.output.filename}.map`;

   const config = {
      mode: "development",
      devtool: false,
      /*
      devServer: {
         openPage: "index.html?num=1"
      },
      */
      plugins: [
         new webpack.SourceMapDevToolPlugin({
            filename: filenamemap
         })
      ]
   }

   return merge(common, config);

}
