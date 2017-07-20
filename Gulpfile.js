const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
var path = require("path");
const merge = require('webpack-merge');

function webpackOptions(options) {
  const base = {
    watch: options.watch,
    devtool: options.debug ? 'inline-source-map' : '',
    debug: options.debug,
    output: {
      path: __dirname + "/dist",
      filename: "[name].js",
      publicPath: options.publicPath,
    },
    resolve: {
      root: [
        path.join(__dirname, "packages")
      ],
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, "src")
          ],
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
  };

  return [
    merge(base, {
      entry: {
        "angular": './src/angular/angular-1.js',
        "jquery": './src/jquery/main.js',
      }
    }),
    merge(base, {
      entry: {
        "input": './src/input/input.js',
        "codemirror-3": './src/codemirror-3/codemirror-3.js',
        "codemirror-4": './src/codemirror-4/codemirror-4.js',
      },
      output: {
        libraryTarget: 'umd'
      }
    })
  ]
}

gulp.task("default", function (callback) {
  webpack(webpackOptions({
    watch: false,
    debug: false
  }), function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
    callback();
  });
});

gulp.task("watch", function () {
  webpack(webpackOptions({
    watch: true,
    debug: true
  }), function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
  });
});
