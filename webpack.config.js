const path = require('path');
const merge = require('webpack-merge');
const ENV = process.env.NODE_ENV || 'development';
const isDev = ENV === 'development';

const base = {
  watch: isDev,
  devtool: isDev ? 'inline-source-map' : '',
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.js', '.ts']
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
          presets: ['es2015']
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      }
    ]
  }
};

module.exports = [
  // Has side effect
  merge(base, {
    entry: {
      "angular": './src/angular/angular-1.js',
      "jquery": './src/jquery/main.js',
    }
  }),
  // No side effect
  merge(base, {
    entry: {
      "inline-attachment": "./src/inline-attachment.js",
      "input": './src/input/input.js',
      "codemirror-3": './src/codemirror-3/codemirror-3.js',
      "codemirror-4": './src/codemirror-4/codemirror-4.js',
    },
    output: {
      libraryTarget: 'umd'
    }
  })
]
