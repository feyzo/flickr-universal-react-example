require('../stylesheets/style.scss');

import React from 'react';
import reqwest from 'reqwest';

import Photo from './Photo';


var App = React.createClass({
  getInitialState : function () {
    return {
      tagName: undefined,
      photos: []
    };
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      tagName: nextProps.params.tagName
    });

    this.fetchPhotos(nextProps.params.tagName);
  },
  
  componentDidMount : function () {
    this.fetchPhotos();
  },

  fetchPhotos: function (tagName) {
    reqwest({
      method: 'GET',
      type: 'jsonp',
      jsonpCallback: 'jsoncallback',
      url: 'https://api.flickr.com/services/feeds/photos_public.gne',
      data: {
        format: 'json',
        lang: 'en-us',
        tags: tagName
      }
    })
    .then((res) => {
      console.log(res.items);
      this.setState({
        photos: res.items
      });
    })
    .catch(function (err, msg) {
      console.error('Error on flickr GET', err, msg);
    });
  },

  render : function() {
    let appContent = <p>Loading...</p>;

    if (this.state.photos.length > 0) {
      appContent = this.state.photos.map(photo => {
        return <Photo key={photo.link} photo={photo} />;
      });
    }

    return (
      <div>
        <h1>Flickr Photo Stream <small>{this.state.tagName}</small></h1>
        <div className="row">
          {appContent}
        </div>
      </div>
    );
  }
});

export default App;
