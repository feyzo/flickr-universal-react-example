import '../styles/style.scss';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import jsonpParser from '../jsonpParser.js';

import Photo from './Photo';

const flickrUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&lang=en-us&jsoncallback=callback';

class App extends Component {
  static contextTypes = {
    getInitialData: PropTypes.func
  }

  static requestState() {
    return App.fetchPhotos();
  }

  constructor(props, context) {
    super(props, context);

    if (!context.getInitialData(this)) {
      App.requestState()
        .then(photos => {
          this.setState({ photos: photos });
        });
    }

    this.state = {
      tagName: undefined,
      photos: context.getInitialData(this)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tagName: nextProps.params.tagName
    });

    App
      .fetchPhotos(nextProps.params.tagName)
      .then((photos) => {
        this.setState({
          photos: photos
        });
      });
    window.scrollTo(0,0);
  }

  static fetchPhotos(tagName) {
    let url = flickrUrl;

    if (tagName) {
      url += `&tags=${tagName}`;
    }

    return new Promise(function (resolve) {
      jsonpParser(url, 'callback', function (err, data) {
        resolve(data.items);
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          <Link to="/">Flickr Photo Stream </Link>
          <small>
            {this.state.tagName}
          </small>
        </h1>
        <div className="row">
          {
            this.state.photos.map(photo => {
              return (
                <Photo key={photo.link} photo={photo} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;