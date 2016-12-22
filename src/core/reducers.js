import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { itemsReducer } from './items/reducer'

export default combineReducers({
  routing: routerReducer,
  items: itemsReducer
})
