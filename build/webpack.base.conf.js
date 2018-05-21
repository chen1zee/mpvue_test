const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const MpvuePlugin = require('webpack-mpvue-asset-plugin')
const router = require('../config/router')
const wordReplace = require('../config/word-replace')
const WebpackBuildCompDependenciesPlugin = require('../WebpackBuildCompDependenciesPlugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const appEntry = { app: resolve('./src/main.js') }
// 注入
const pages = {}
Object.keys(router).forEach(key => {
    pages[key] = resolve(router[key])
})
// const entry = Object.assign({}, appEntry, pages)
const entry = Object.assign({}, pages)

module.exports = {
  // 如果要自定义生成的 dist 目录里面的文件路径，
  // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
  // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
  entry,
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src'),
      '/src': resolve('src'),
      'src': resolve('src')
    },
    symlinks: false
  },
  // externals: {
  //     vue: 'vue',
  //     vuex: 'vuex'
  // },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        // 暂时换回原来的
        // loader: 'mpvue-loader',
        // 换成 经过 修改 的 mpvue-loader
        loader: resolve('mpvue-loader/index.js'),
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test'), resolve('node_modules/mpvue-entry')],
        use: [
          'babel-loader',
          {
            // 暂时换回原来的
            // loader: 'mpvue-loader',
            // 换成 经过 修改 的 mpvue-loader
            loader: resolve('mpvue-loader/index.js'),
            options: {
              checkMPEntry: true
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name]].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    new MpvuePlugin(),
    new webpack.DefinePlugin(wordReplace),
    new WebpackBuildCompDependenciesPlugin()
  ]
}
