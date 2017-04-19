const path = require("path")
const fs = require("fs")
const nodeModules = fs.readdirSync("node_modules").filter(function(x) { return x !== ".bin" })

module.exports = require("./make-webpack-config.js")({
  _special: {
    separateStylesheets: true,
    minimize: true,
    sourcemaps: true,
    loaders: {
      "worker.js": ["worker-loader?inline=true&name=[name].js", "babel"]
    }
  },

  entry: {
    "swagger-ui": [
      "./src/style/main.scss",
      "./src/core/index.js"
    ]
  },

  externals: function(context, request, cb) {
    if(nodeModules.indexOf(request) !== -1) {
      cb(null, "commonjs " + request)
      return
    }
    cb()
  },

  output:  {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist",
    library: "SwaggerUICore",
    libraryTarget: "umd",
    filename: "[name].js",
    chunkFilename: "js/[name].js",
  },

})
