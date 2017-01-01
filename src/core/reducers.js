import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import { authReducer } from './auth/reducer'
import { itemsReducer } from './items/reducer'
import { listsReducer } from './lists/reducer'

export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  items: itemsReducer,
  lists: listsReducer
})
