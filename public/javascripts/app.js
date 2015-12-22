require('../stylesheets/style.css');

var React = require('react');
var ReactDOM = require('react-dom');


var testArr = [1, 2, 3, 4, 5];

var App = React.createClass({

  render : function() {
    return (
      <div>
        <h1>Test</h1>
        <ul>
        {
          testArr.map(i => <li>{i}</li>)
        }
        </ul>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.querySelector('#main'));