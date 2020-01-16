const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  performance: {
    hints: false,
  },
  watchOptions: {
    //不监听的node_modules目录下的文件,
    ignored: /node_modules/,
  },
  devServer: {
    host: 'localhost',
    port: '8088',
    open: true,
    compress: true,
    proxy: {
      '/**': {
        // target: 'http://www.cs-saimoyun.com',
        target: 'http://10.99.44.165:8028',
        changeOrigin: true,
        bypass: function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            return '/index.html'
          }
        },
        onProxyReq: function (proxyReq, req, res) {
          proxyReq.setHeader('tokenId', '8d75207e44ac163b6909b2ab09df38d3')
          proxyReq.setHeader('cookie', 'JSESSIONID=514CFB1B0D481B5FA2C24BDCC634B7E1')
        },
      },
    }
  },
})

