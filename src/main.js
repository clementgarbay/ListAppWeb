// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import initStore from './core/store'
import Root from './views/root'
import './views/styles/main.scss'


const store = initStore()
const syncedHistory = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <AppContainer>
    <Root history={syncedHistory} store={store} />
  </AppContainer>,
  document.getElementById('app')
)
