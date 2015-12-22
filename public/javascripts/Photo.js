const React = require('react');

module.exports = React.createClass({
  render: function() {
    let photo = this.props.photo;

    let author = photo.author.split('(')[1].slice(0, -1);

    let desc = 'No details';

    //Group paragraphs
    let descItems = photo.description.match(/<p>(.*?)<\/p>/gi);
    //3rd paragraph is the description.
    //Unfortunately flickr sends a lot of crud
    if (descItems.length > 2) {
      desc = descItems[2];
    }

    return (
      <div className="photo-box">
        <img src={photo.media.m} alt=" "/>
        <a href={photo.link} target="_blank">
          <h2>{photo.title}</h2>
        </a>
        by
        <a href={'https://www.flickr.com/people/' + photo.author_id}
          target="_blank">
          <h3>{author}</h3>
        </a>
        <p dangerouslySetInnerHTML={{__html: desc}}></p>
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