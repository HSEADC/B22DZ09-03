const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    theory: './src/theory.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|svg|jpeg|jpg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/share/'),
          to: path.resolve(__dirname, 'dev_build/share/')
        },
        {
          from: path.resolve(__dirname, 'src/share/'),
          to: path.resolve(__dirname, 'docs/share/')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    // Index chunk
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index']
    }),
    //  Guideline
    // new HtmlWebpackPlugin({
    //   template: './src/guideline.html',
    //   filename: './guideline.html',
    //   chunks: ['index']
    // }),
    //Theory chunk
    new HtmlWebpackPlugin({
      template: './src/theory.html',
      filename: './theory.html',
      chunks: ['theory'] // Дублируем имя Chunks в массив, чтоб он подгружал
    }),

    // Section
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: './about.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/places.html',
      filename: './places.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/legends.html',
      filename: './legends.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/characters.html',
      filename: './characters.html',
      chunks: ['index']
    }),

    // Article
    new HtmlWebpackPlugin({
      template: './src/places/moskva_istor.html',
      filename: './places/moskva_istor.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/legends/podval_tk.html',
      filename: './legends/podval_tk.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/characters/krovavaya_barinya.html',
      filename: './characters/krovavaya_barinya.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './src/tips/nos_sobaki.html',
      filename: './tips/nos_sobaki.html',
      chunks: ['index']
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ]),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/menu.html'),
        location: 'menu',
        template_filename: '*',
        priority: 'replace'
      }
    ]),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/footer.html'),
        location: 'footer',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
