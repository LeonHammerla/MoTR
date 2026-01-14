module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(csv|tsv)$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
          }
        }
      ]
    }
  },
  lintOnSave: false,
  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {}
  },
  //devServer: {
  //  disableHostCheck: true,
  //  host: '0.0.0.0'
  //},
    devServer: {
      allowedHosts: ['leichtesprache.neglab.de'],
      host: '0.0.0.0'
    },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/MoTR/MoTR/run_motr_in_magpie/provo/'
      : '/'

//   publicPath:
//     process.env.NODE_ENV === 'production' && process.env.REPO_NAME
//       ? '/' + process.env.REPO_NAME + '/'
//       : '/'
};
