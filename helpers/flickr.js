const request = require('request');

module.exports = function () {
  return request({
    method: 'GET',
    url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    qs: {
      format: 'json',
      lang: 'en-us',
      nojsoncallback: 1
      // ,
      // id: '',
      // tags: '',
      // tagmode: '',

    }
  });
};