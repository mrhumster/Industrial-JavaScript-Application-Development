// Импортируем модуль для работы с путями
const path = require('path');

// Для того чтобы достучаться до плагина
const HtmlWebpackPlugin = require('html-webpack-plugin');

// У самого Webpack уже есть встроенные плагины, их неплохо тоже ипортировать
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    // Конфигурация
    // Указываем входную точку
    entry: ['./src/main.js', './src/vendors.js'],
    // Указываем точку выхода
    output: {
        // Полный путь к директории для хранения конечного файла
        path: path.resolve(__dirname, 'dist'),
        // Указываем имя этого файла
        filename: '[name].bundle.js',
    },
    // Указываем тут, что будем использовать лоадеры
    module: {
        // Указываем правила для данных модулей
        rules: [
            // Указываем правило для каждого лоадера
            {test: /.txt$/, use: 'raw-loader'},
            /*
            {test: /\.ts$/, use: 'ts-loader'},
            {test: /\.css$/, use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]}
            */
        ],
    },
    // Указываем новые плагины для обработки файлов
    plugins: [
        // Указываем что будем обрабатывать HTML с помощью плагина
        new HtmlWebpackPlugin({template: "./src/index.html"})
    ],
    watch: true,
    watchOptions: {
        ignored: ['/node_modules/'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        client: {
            overlay: {
                errors: true,
                warning: false,
            },
            progress: true
        },
    },
};