module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.exprContextCritical = false;
      return webpackConfig;
    },
  },
};
