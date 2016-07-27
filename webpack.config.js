var webpack = require('webpack');
var path = require('path');

//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('commons');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    devtool: "source-map",    //生成sourcemap,便于开发调试
    // 插件项
    plugins: [
        //js文件的压缩
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("bind.css")
    ],
    // 页面入口文件配置
    entry: {
        bind : './js/bind'
    },
    // 入口文件输出配置
    output: {
        path: 'dist',
        filename: 'bind.js'
    },
    module: {
        // 加载器配置
        loaders: [
            // 跟踪源文件模式，便于调试。
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer!sass?sourceMap')
            },
            {
                test: /\.css$/,
                exclude: /(dist)/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer')
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=20480&name=[path][name].[ext]'
            }
        ]
    }
};

