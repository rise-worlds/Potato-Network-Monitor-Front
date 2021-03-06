/* eslint import/no-webpack-loader-syntax:0 */
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import bugsnagClient from 'utils/bugsnag';
import socket from 'init/socket';

/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./assets/favicon/favicon.ico';
import '!file-loader?name=[name].[ext]!./assets/favicon/favicon-16x16.png';
import '!file-loader?name=[name].[ext]!./assets/favicon/favicon-32x32.png';
// import '!file-loader?name=[name].[ext]!./assets/favicon/mstile-150x150.png';
// import '!file-loader?name=[name].[ext]!./assets/favicon/safari-pinned-tab.svg';
import '!file-loader?name=[name].[ext]!./assets/favicon/site.webmanifest';
// import '!file-loader?name=[name].[ext]!./assets/favicon/apple-touch-icon.png';
import '!file-loader?name=[name].[ext]!./assets/favicon/android-chrome-256x256.png';
import '!file-loader?name=[name].[ext]!./assets/favicon/android-chrome-128x128.png';
/* eslint-enable import/no-unresolved, import/extensions */

// Store
import { store } from './init/store';
import { history } from './init/middleware';

// import configureStore from './configureStore';

// Import CSS reset and Global Styles
import './assets/styles/globalStyles';

// Create redux store with history
const MOUNT_NODE = document.getElementById('app');
const ErrorBoundary = bugsnagClient.getPlugin('react');

/* function updateCache() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
      });
    });
    if (window.caches) {
      window.caches.keys().then(res => {
        if (!res) {
          console.log('No cache === ', res);
        }
        console.log(res);
        res.forEach(elem => {
          window.caches.delete(elem);
        });
        window.location.reload();
      });
    }
  }
}

const version = localStorage.getItem('version');
fetch(`${process.env.API_URL}/api/v1/version`)
  .then(response => response.json())
  .then(data => {
    const mainVersion = `${data.version}`;
    if (!version) {
      localStorage.setItem('version', mainVersion);
    } else if (version !== mainVersion) {
      localStorage.setItem('version', mainVersion);
      updateCache();
    }
  })
  .catch(err => console.error(err));
*/

socket.init(store);

const render = () => {
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Chunked polyfill for browsers without Intl support
render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
