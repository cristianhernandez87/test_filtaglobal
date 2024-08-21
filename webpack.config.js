const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const copyImages = new CopyWebpackPlugin([
  {
    from: 'src/img',
    to: 'img'
  }
]);

const extractSass = new MiniCssExtractPlugin({
  filename: "css/index.css"
});

const config = {
  entry: "./src/js/index.ts",
  output: {
    filename: "js/index.js",
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.hbs', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../fonts/'
        },
        exclude: [path.resolve(__dirname, 'img')]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
          outputPath: 'img/',
          publicPath: '../img/'
        },
        exclude: [path.resolve(__dirname, 'fonts')]
      },
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader'],
      },
      { test: /\.css$/, 
        use: [MiniCssExtractPlugin.loader,'css-loader', 'style-loader'],
      },
      {
        test: /\.(hbs|handlebars)$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    copyImages,
    extractSass,
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
  ]
};

if (process.env.NODE_ENV === 'development') {

  config.devServer = {
    hot: true,
    publicPath: '/build/'
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;
