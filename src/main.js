import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducers from './core/reducers';
import Root from './views/root';
import './views/styles/styles.scss';


const store = createStore(reducers);
const syncedHistory = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <AppContainer>
    <Root history={syncedHistory} store={store} />
  </AppContainer>,
  document.getElementById('app')
)
