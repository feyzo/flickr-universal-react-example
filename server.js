require('babel-register');

require.extensions['.scss'] = function() {
  return;
};

var path = require('path');
var express = require('express');
var Router = require('./app/Router');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

if (isDeveloping) {
  var webpack = require('webpack');
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('./webpack.config.js');

  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicpath: config.output.publicpath,
    contentBase: 'app',
    watch: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr'
  }));
}

console.log(Router);
app.get('*', Router);

app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});