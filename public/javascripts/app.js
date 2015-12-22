require('../stylesheets/style.css');

const React = require('react');
const ReactDOM = require('react-dom');

const Photo = require('./Photo');

var testArr = [1, 2, 3, 4, 5];

var App = React.createClass({
  getInitialState : function () {
    return {
      photos: []
    };
  },

  render : function() {
    let appContent = <p>Loading...</p>;

    if (this.state.photos.length > 0) {
      appContent = this.state.photos.map(photo => {
        return <Photo key={photo.name} photo={photo} />;
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