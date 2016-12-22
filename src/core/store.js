import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'


export default (): Store => {

  // Use redux-thunk to delay the dispatch of an action (here for async actions)
  const middleware = applyMiddleware(thunk)

  return createStore(reducers, {}, middleware)
}
