const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('============================start===============================');
console.log(__dirname);

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        index: './index.js',
    },
    output: {
        filename: 'static/js/[name]-[hash:5].js',
        path: resolve('./www'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            // '@Common': path.resolve(__dirname, './../common'),
            // '@Validator': path.resolve(__dirname, './../common/validator'),
            // '@Request': path.resolve(__dirname, './../comp/request')
        }
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
            }
            ,
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:
                    [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                outputPath: 'static/images/'
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
        new HtmlWebpackPlugin({
            filename: resolve('./www/index.html'),
            template: './index.html',
            title: '瑞金苏区干部学院',
            inject: true,
            // favicon: './assets/favicon.ico'
        })
    ]
}
;
