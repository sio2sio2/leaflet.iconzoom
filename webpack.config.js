const webpack = require("webpack"),
      merge = require("webpack-merge"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      CopyPlugin = require('copy-webpack-plugin'),
      name = require("./package.json").name;


// Configuración para Babel
function confBabel(env) {
   return {
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
   }
}

// Configuración adicional para el sabor bundle,
// o sea, el que contiene todas las dependencias.
function confBundle() {
   return {
      entry: {
         [name]: ["leaflet/dist/leaflet.css"]
      },
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
   }
}


// Configuración sin dependencias
function confNoDeps() {
   return {
      externals: {
         leaflet: {
            root: "L",
            amd: "leaflet",
            commonjs: "leaflet",
            commonjs2: "leaflet"
         }
      },
      output: {
         libraryTarget: "umd",
         umdNamedDefine: true,
         library: "Lcz"
      }
   }
} 

// Configuración para desarrollo
// (los mapeos de código fuente en fichero aparte)
function confDev(filename) {
   return {
      devtool: false,
      plugins: [
         new webpack.SourceMapDevToolPlugin({
            filename: `${filename}.map`
         })
      ]
   }
}


//Configuración adicional para depuración
//(Se requiere copiar el ejemplo en el servidor)
function confDebug() {
   return {
      devServer: {
         contentBase: false,
         open: "chromium",
         //openPage: "index.html"
      },
      plugins: [
         new CopyPlugin([
            {from: "examples", to: ".", ignore: ["*.swp"] }
         ])
      ]
   }
}

module.exports = env => {
   switch(env.output) {
      case "debug":
      case "src":
         mode = "development";
         break;
      default:
         mode = "production";
   }

   switch(env.output) {
      case "min":
         filename = "[name].js";
         break;
      case "debug":
         filename = "dist/[name].js";
         break;
      case "src":
         filename = "[name]-src.js";
         break
      default:
         filename = `[name].${env.output}.js`;
   }

   const common = {
      mode: mode,
      entry: {
         [name]: ["./src/index.js"]
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

   return merge.smart(
      common,
      mode === "production"?confBabel(env):confDev(filename),
      env.output === "bundle"?confBundle():confNoDeps(),
      env.output === "debug"?confDebug():null
   )
}
