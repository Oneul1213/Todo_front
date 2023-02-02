const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/todo-list': {
        target: 'http://localhost:8081',  // api server domain
        changeOrigin: true
      }
    }
  }
})
