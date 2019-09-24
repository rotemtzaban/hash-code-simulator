import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const devMode = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
    mode: devMode ? 'development' : 'production',
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    devtool: devMode ? 'eval-source-map' : 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: 'source-map-loader',
                enforce: 'pre'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: devMode }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        })
    ]
};

export default config;
