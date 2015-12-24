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
          {styleTag}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
          {this.renderInitialData()}
          <script src={isDeveloping ? '/bundle.js' : '/bundle.min.js'}></script>
        </body>
      </html>
    );
  }
}

export default Root;
