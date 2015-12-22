const React = require('react');



module.exports = React.createClass({
  render: function() {
    //Defined here instead of globally
    //Becase regex is stateful
    //http://stackoverflow.com/a/11477448/1744033
    const regexBetweenParantheses = /\(([^)]+)\)/ig;
    const regexBetweenParagraphs = /<p>(.*?)<\/p>/ig;

    const photo = this.props.photo;
    
    let author = regexBetweenParantheses.exec(photo.author)[1];
    
    let desc = 'No details';
    //Group paragraphs
    //let descItems = photo.description.match(/<p>(.*?)<\/p>/gi);
    let descItems = regexBetweenParagraphs.exec(photo.description);
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