const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {
    const PATHS = {
        src: path.join(__dirname, './src'),
        dist: path.join(__dirname, './dist'),
    };

    const PAGES_DIR = `${PATHS.src}`;
    const production = options.mode === 'production';
    const publicDir = production ? './' : '/';

    return {
        context: path.resolve(__dirname, `${PATHS.src}`),
        entry: {
            app: `${PATHS.src}/js`,
        },
        devServer: {
            overlay: {
                warnings: true,
                errors: true,
            },
            watchOptions: {
                ignored: /node_modules/,
            },
        },
        output: {
            filename: 'js/main.js',
            path: PATHS.dist,
            publicPath: publicDir,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules/',
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader },
                        'css-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: `${PAGES_DIR}/scss/_var.scss`,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jQuery',
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
            }),
            new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/index.pug`,
                filename: './index.html',
            }),
        ],
    }
}