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

  static requestState(params) {
    return App.fetchPhotos(params.tagName);
  }

  constructor(props, context) {
    super(props, context);

    if (!context.getInitialData(this)) {
      App.requestState(props.params.tagName)
        .then(photos => {
          this.setState({ photos: photos });
        });
    }

    this.state = {
      tagName: props.params.tagName,
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
    let selectedTag;

    if (this.state.tagName) {
      selectedTag = (
        <small className="tag">
          {this.state.tagName}
        </small>
      );
    }

    return (
      <div>
        <h1 className="title">
          <Link to="/">
            Flickr Photo Stream
          </Link>
          {selectedTag}
        </h1>
        <div className="refresh">
          <Link to="/">
            {this.state.tagName ? 'go back' : 'refresh' }
          </Link>
        </div>
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