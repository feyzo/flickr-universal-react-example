module.exports = {
  entry: './public/javascripts/index.js',
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
      loaders: ['style', 'css', 'sass', 'autoprefixer-loader?browsers=last 2 version']
    }, {
      test: /\.css$/,
      loader: 'sass-loader!autoprefixer-loader?browsers=last 2 versions'
    }]
  }
};