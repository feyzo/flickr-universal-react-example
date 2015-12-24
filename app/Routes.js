import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NoMatch from './components/NoMatch';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={App} />
    <Route path="/tag/:tagName" component={App}/>
    <Route path="*" component={NoMatch} />
  </Route>
);