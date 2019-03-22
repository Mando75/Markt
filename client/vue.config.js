module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/graphql": {
        target: "http://localhost:4000/graphql",
        secure: false,
        changeOrigin: false,
        cookieDomainRewrite: "localhost:4000",
        onProxyReq: function(request) {
          request.setHeader(
            "Access-Control-Allow-Origin",
            "http://localhost:8080"
          );
          // request.setHeader('origin', 'http://localhost:4000')
        }
      }
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
  }
};
