const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BaseConfig = require('./webpack.base.js');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = merge(BaseConfig, {
    devtool: '#eval-source-map',
    mode: 'development',
    devServer: {//开发服务器的配置
        //端口号配置，默认为8080
        port: 3000,
        //进度条
        progress: true,
        //指定打开浏览器显示的目录，默认为根目录（项目目录）
        contentBase: './www'
    },

    plugins: [
        new CleanWebpackPlugin([ './www' ], {
            root: path.join(__dirname, '../'),
            verbose: true  // Write logs to console.
        }),
        // new HtmlWebpackPlugin({
        //     filename: resolve('./www/index.html'),
        //     template: './index.html',
        //     title: '瑞金苏区干部学院',
        //     inject: true
        // })
    ]
});
