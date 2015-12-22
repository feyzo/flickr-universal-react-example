const React = require('react');

module.exports = React.createClass({
  render: function() {
    let photo = this.props.photo;

    let author = photo.author.split('(')[1].slice(0, -1);

    return (
      <div className="photo-box">
        <img src={photo.media.m} alt=" "/>
        <h2>Title</h2> by <h3>{author}</h3>
        {photo.description}
        <ul> {
          photo.tags.split(' ')
            .map((tag) => {
              return (<li key={tag}>{tag}</li>);
            })
        }
        </ul>
      </div>
    );
  }
});