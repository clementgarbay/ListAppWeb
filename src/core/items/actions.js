import { FirebaseStorage } from '../storage/firebase-storage'
import { Item } from './item'
import {
  CREATE_ITEM_ERROR,
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEM_ERROR,
  UPDATE_ITEM_SUCCESS
} from './action-types'

const storage = new FirebaseStorage(Item, {
  onAdd: createItemSuccess
}, 'items')

export function createItem(name: string): Function {
  return (dispatch: Function) => {
    const item = new Item({name: name})
    storage.add(item)
      .then((item: Item): void => dispatch(createItemSuccess(item)))
      .catch((error: *): void => dispatch(createItemError(error)))
  }
}

export function createItemSuccess(item: Item): {} {
  return {
    type: CREATE_ITEM_SUCCESS,
    payload: item
  }
}

export function createItemError(error: *): {} {
  return {
    type: CREATE_ITEM_ERROR,
    payload: error
  }
}

export function loadItems(): Function {
  return (dispatch: Function) => {
    storage.subscribe(dispatch)
  }
}
