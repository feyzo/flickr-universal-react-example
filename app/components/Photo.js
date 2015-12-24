import React, { Component } from 'react';
import { Link } from 'react-router';

class Photo extends Component {
  
  renderAuthor(dirtyAuthor, authorId) {
    //Defined here instead of globally
    //Becase regex is stateful
    //http://stackoverflow.com/a/11477448/1744033
    const regexBetweenParantheses = /\(([^)]+)\)/ig;
    let author = regexBetweenParantheses.exec(dirtyAuthor)[1];
    let authorLink = 'https://www.flickr.com/people/' + authorId;
    
    return (
      <a href={authorLink} target="_blank">
        <small>{author}</small>
      </a>
    );
  }

  renderDesc(dirtyDesc) {
    const regexBetweenParagraphs = /<p>(.*?)<\/p>/ig;

    let descContent = <div><p>No details</p></div>;

    //Group paragraphs
    let descItems = dirtyDesc.match(regexBetweenParagraphs);
    //3rd paragraph is the description.
    //Unfortunately flickr sends a lot of crud

    if (descItems.length > 2) {
      let desc = descItems[2];
      descContent = <div dangerouslySetInnerHTML={{__html: desc}}></div>;
    }

    return descContent;
  }

  renderTag(tag) {
    let tagPath = `/tag/${tag}`;

    return (
      <li key={tag} className="tag">
        <Link to={tagPath}>{tag}</Link>
      </li>
    );
  } 

  render() {
    const photo = this.props.photo;

    return (
      <figure className="photo-box">
        <div className="content">
          <img src={photo.media.m} alt={photo.title}/>

          <figcaption>
            <h2>
            <a href={photo.link} target="_blank">
              {photo.title || 'Photo'}
            </a> 

            &nbsp;by {this.renderAuthor(photo.author, photo.author_id)}
            </h2>
          </figcaption>

          {this.renderDesc(photo.description)}
          
          <ul> {
            photo.tags.split(' ')
              .filter(tag => tag.length > 0)
              .map(this.renderTag)
          }
          </ul>
        </div>
      </figure>
    );
  }
}

export default Photo;