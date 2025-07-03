const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx', // entry point for React app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@data': path.resolve(__dirname, 'src/data'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // transpile JSX and JS
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // handle CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // handle images
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.json$/, // handle JSON files
        type: 'json',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico', 
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true, // for React Router
    compress: true,
    port: 3000,
    open: true,
  },
  watch: true, 
  watchOptions: {
    ignored: /node_modules/, 
    aggregateTimeout: 300,
    poll: 1000, 
  },
  mode: 'development', 
};
