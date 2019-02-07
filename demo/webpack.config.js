const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const child_process = require('child_process');

// 将静态资源文件单独打包
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === "development"

const config = {
    // 这是一个web项目
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output:{
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module:{
        rules:[
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
            {
                // 加载vue组件
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                // 加载jsx文件
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                // 加载css文件
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // 加载图片
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit:1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        // 使用Vue、React这些框架的时候要用到的插件
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
}

if(isDev){
    config.module.rules.push(
        {
            // 加载css预处理器Stylus
            test: /\.styl$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                'stylus-loader'
            ]
        }
    )
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: "127.0.0.1",
        overlay: {
            errors: true
        },
        // 局部（当前组件）热更新
        hot: true,
    }
    // 无刷新热更新
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
else{
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        // 将类库代码单独打包(变动少，可以长期在浏览器缓存，减轻服务器压力)
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test: /\.styl$/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            })
        }
    )
    config.plugins.push(
        new ExtractPlugin('style.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // 因为当有新的模块被加入时，webpack会给其添加一个id，其他文件的hash会产生变化，
        // 浏览器长缓存的策略就会失效，
        // 将app.*.js中webpack相关的代码单独打包到一个文件中，可以避免此问题
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}

// 复制server.js到dist目录
// child_process.exec("cp -rf api.js "+config.output.path)

module.exports = config;

