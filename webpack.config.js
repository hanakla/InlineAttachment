const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ENV = process.env.NODE_ENV || 'development';
const isDev = ENV === 'development';

const base = {
  mode: ENV,
  devtool: isDev ? 'inline-source-map' : '',
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  externals: {
    jquery: "commonjs2 jquery",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, "src")
        ],
        loader: 'babel-loader',
        query: {
          presets: [['es2015', {modules: false}]]
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]
};

module.exports = [
  // Has side effect
  merge(base, {
    entry: {
      "angular": './src/angular/angular-1.js',
    }
  }),
  // No side effect
  merge(base, {
    entry: {
      "inline-attachment": "./src/inline-attachment.ts",
      "input": './src/input/input.ts',
      "jquery": './src/jquery/jquery.ts',
      "codemirror-3": './src/codemirror-3/codemirror-3.ts',
      "codemirror-4": './src/codemirror-4/codemirror-4.ts',
    },
    output: {
      libraryTarget: 'umd'
    }
  })
]
