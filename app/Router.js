'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { createHistory } from 'history';
import { Router, match, RoutingContext } from 'react-router';
import Routes from './Routes';
import Provider from './Provider';
import Root from './components/Root';
import NoMatch from './components/NoMatch';
import { isClient, getPropsFromRoute } from './util';

if (isClient) {
  ReactDOM.render(
    <Provider>
      <Router history={createHistory()}>{Routes}</Router>
    </Provider>,
    document.getElementById('root')
  );
}

function renderComponentWithRoot(Component, componentProps, initialData) {
  const componentHtml = renderToStaticMarkup(
    <Provider initialData={initialData}> 
      <Component {...componentProps} />
    </Provider>
  );

  return '<!doctype html>\n' + renderToStaticMarkup(
    <Root content={componentHtml} initialData={initialData} />
  );
}

function handle404(res) {
  const wholeHtml = renderComponentWithRoot(NoMatch);
  res.status(404).send(wholeHtml);
}

function handleError(res, error) {
  res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
  res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function handleRoute(res, renderProps) {
  const routeProps = getPropsFromRoute(renderProps, ['requestState']);

  function renderPage(response) {
    const wholeHtml = renderComponentWithRoot(RoutingContext, renderProps, response);
    res.status(200).send(wholeHtml);
  }

  if (routeProps.requestState) {
    routeProps.requestState().then(renderPage);
  } else {
    renderPage();
  }
}

function ServerRouter(req, res) {
  match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      handleError(error);
    } else if (res, redirectLocation) {
      handleRedirect(res, redirectLocation);
    } else if (renderProps) {
      handleRoute(res, renderProps);
    } else {
      handle404(res);
    }
  });
}

export default ServerRouter;