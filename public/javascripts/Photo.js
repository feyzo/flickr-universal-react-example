const React = require('react');

module.exports = React.createClass({
  render: function() {
    let photo = this.props.photo;

    return (
      <div className="photo-box">
        {photo.name}
      </div>
    );
  }
});