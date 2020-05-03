const path = require("path");
const entryPath = "";
const entryFile = "app.js";
const autoprefixer = require('autoprefixer');
const Html = require('html-webpack-plugin');
const MiniCSS = require("mini-css-extract-plugin");
const Compression = require("compression-webpack-plugin");


module.exports = {
    entry: ["whatwg-fetch", `./${entryPath}/js/${entryFile}`],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, `${entryPath}/build`)
    },
    mode: 'development',
    devtool: "source-map",
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, `${entryPath}`),
        publicPath: "/build/",
        compress: true,
        port: 3002
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCSS.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                }],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    publicPath: "/images/",
                    outputPath: "/images/"
                }
            }
        ]
    },
    plugins: [
        new Html({
            filename: "index.html",
            template: "./index.html"
        }),
        new MiniCSS({
            filename: "app.css",
        }),
        new Compression({
            threshold: 0,
            minRatio: 0.8
        })
    ]


};