// module.exports = {
//     entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
//     output: {
//       path: __dirname + "/public",//打包后的文件存放的地方
//       filename: "bundle.js"//打包后输出文件的文件名
//     }
// }

// module.exports = {
//     devtool: 'eval-source-map',
//     entry:  __dirname + "/app/main.js",
//     output: {
//       path: __dirname + "/public",
//       filename: "bundle.js"
//     }
// }

// module.exports = {
//     devtool: 'eval-source-map',
  
//     entry:  __dirname + "/app/main.js",
//     output: {
//       path: __dirname + "/public",
//       filename: "bundle.js"
//     },
  
//     devServer: {
//       contentBase: "./public",//本地服务器所加载的页面所在的目录
//       historyApiFallback: true,//不跳转
//       inline: true//实时刷新
//     } 
// }
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    // test: /\.jsx?$/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    },
                    // exclude: /node_modules/,
                    // query: {
                    //     presets: ['es2015']
                    // }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin('build/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
};