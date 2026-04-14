const path = require('path')
const { UnifiedWebpackPluginV5 } = require('weapp-tailwindcss/webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new UnifiedWebpackPluginV5({
        appType: 'uni-app'
      })
    ]
  }
}