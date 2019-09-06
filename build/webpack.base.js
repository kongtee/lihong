const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const router = require('../router/index');
// const HtmlWebpackPlugin = require('html-withimg-loader');

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('============================start===============================');
console.log(__dirname);

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

function getHtmlArray(moduleExportsPlugins) {

    // 根据模板配置生成 HtmlWebpackPlugin 需要的配置
    const getHtmlConfig = function (name, chunks, title) {
        return {
            filename: resolve(`./www/${name}.html`),
            template: `./${name}.html`,
            // favicon: './src/assets/images/public/favicon.ico',
            title,
            inject: true,
            hash: true, // 开启hash
            chunks, // 页面要引入的包
            minify: process.env.NODE_ENV === 'development' ? false : {
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
                removeAttributeQuotes: true, // 去除属性引用
            },
        };
    };

    // 循环创建模板配置
    router.forEach((element) => {
        const {_html, chunks, title} = element;
        moduleExportsPlugins.push(new HtmlWebpackPlugin(getHtmlConfig(_html, chunks, title)));
    })
}

module.exports = {
    entry: {
        index: './js/index.js',
        school: './js/school.js',
        jidi: './js/jidi.js',
        news: './js/news.js',
        concat: './js/concat.js'
    },
    output: {
        filename: 'static/js/[name]-[hash:5].js',
        path: resolve('./www'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.json']
    },

    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader'
            // },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/url',
                        options: {
                            insertInto: 'header', // 可以指定加在哪个标签下
                            singleton: true,
                            transform: './css.transform.js' // transform 是css的变形函数,相对于webpack.config的路径
                        }
                    },
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use:
                    [
                        {
                            loader: 'style-loader',
                            options: {
                                singleton: true
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
                        }
                        ,
                        {
                            loader: 'less-loader'
                        }
                    ]
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:
                    [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                outputPath: './static/images/'
                            }
                        }
                    ]
            }
            ,
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader:
                    'url-loader',
                options:
                    {
                        limit: 10000
                    }
            }
            ,
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:
                    'url-loader',
                options:
                    {
                        limit: 10000
                    }
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name]-[hash:5].css',
            allChunks: true // 一开始所有css都打包
        }),
        // new HtmlWebpackPlugin({
        //     filename: resolve('./www/index.html'),
        //     template: './index.html',
        //     title: '瑞金苏区干部学院',
        //     inject: true,
        //     // favicon: './assets/favicon.ico'
        // })
    ]
}

getHtmlArray(module.exports.plugins);
