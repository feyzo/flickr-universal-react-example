import React, { Component } from 'react';

class Root extends Component {

  renderInitialData() {
    if (this.props.initialData) {
      let innerHtml = `window.__initialData__ = ${JSON.stringify(this.props.initialData)}`;
      return (
        <script dangerouslySetInnerHTML={{__html: innerHtml}} />
      );
    }
  }

  render() {
    const isDeveloping = process.env.NODE_ENV !== 'production';
    const head = this.props.head;

    let styleTag;

    if (!isDeveloping) {
      styleTag = (<link rel="stylesheet" href="/style.min.css" />);
    }

    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          {styleTag}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
          {this.renderInitialData()}
          
          <a href="https://github.com/feyzo/flickr-universal-react-example" target="_blank">
            <img className="ribbon" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"/>
          </a>
          <script src={isDeveloping ? '/bundle.js' : '/bundle.min.js'}></script>
        </body>
      </html>
    );
  }
}

export default Root;
