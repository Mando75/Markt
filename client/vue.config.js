module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: "http://localhost:4000"
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
  }
};
