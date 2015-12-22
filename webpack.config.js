module.exports = {
  entry: './public/javascripts/app.js',
  output: {
    path: __dirname,
    filename: './public/build/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  }
};