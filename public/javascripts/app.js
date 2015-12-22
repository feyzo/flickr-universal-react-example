require('../stylesheets/style.css');

const React = require('react');
const ReactDOM = require('react-dom');
const reqwest = require('reqwest');

const Photo = require('./Photo');

var testArr = [1, 2, 3, 4, 5];

var App = React.createClass({
  getInitialState : function () {
    return {
      photos: []
    };
  },

  componentDidMount : function () {
    reqwest({
      method: 'GET',
      type: 'jsonp',
      jsonpCallback: 'jsoncallback',
      url: 'https://api.flickr.com/services/feeds/photos_public.gne',
      data: {
        format: 'json',
        lang: 'en-us'
        
        // id: '',
        // tags: '',
        // tagmode: '',

      }
    })
    .then((res) => {
      console.log(res.items);
      this.setState({
        photos: res.items
      });
    })
    .catch(function (err, msg) {
      console.error('Error on flick GET', err, msg);
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
        {appContent}
        <ul>
        {
          testArr.map(i => <li key={i}>{i}</li>)
        }
        </ul>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.querySelector('#main'));