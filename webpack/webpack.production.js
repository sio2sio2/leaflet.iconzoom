// webpack/webpack.production.js
const merge = require('webpack-merge');

module.exports = env => {
   const common = require('./webpack.common.js')(env),
         config = {
            mode: "production",
            module: {
               rules: [
                  {
                     test: /\.js$/,
                     exclude: /node_modules/,
                     use: {
                        loader: "babel-loader",
                        options: {
                           presets: [["@babel/env", {
                              debug: env.debug,
                              corejs: 3,
                              useBuiltIns: "usage"
                           }]]
                        }
                     }
                  },
               ]
            }
         };

   return merge(common, config);
}
