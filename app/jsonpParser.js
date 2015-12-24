var withDOM = function (url, callbackName, done) {
  var script = document.createElement('script');

  window[callbackName] = function(data) {
    done(null, data);

    delete window[callbackName];
  };

  script.src = url;
  document.body.appendChild(script);
};

var withNode = function (url, callbackName, done) {
  getBody(url, function (err, body) {
    getObject(body, done);
  });

  function getObject(text, done) {
    var vm = require('vm');

    var context = vm.createContext({
      error: null,
      finalData: null
    });

    var code = 'function ' + callbackName + '(data) {' +
      'finalData = data; }' + text;

    vm.runInContext(code, context);

    done(null, context.finalData);
  }

  function getBody(jsonpUrl, done) {
    var url = require('url');
    var options = url.parse(jsonpUrl);
    var http;

    if (options.protocol === 'http:') {
      http = require('http');
    } else {
      http = require('https');
    }

    http.get(jsonpUrl, function(response) {
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        done(null, body);
      });
    }).on('error', function(e) {
      done(e);
    });
  }
};

var parseJSONP = typeof document === 'undefined' ?
  withNode : withDOM;

module.exports = parseJSONP;
