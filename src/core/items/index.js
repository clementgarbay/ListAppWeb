import { FirebaseStorage } from '../storage/firebase-storage'
import * as itemsActions from './actions'
import { Item } from '../models/item'


const storage = new FirebaseStorage(Item, {
  onCreate: itemsActions.createItemSuccess,
  onUpdate: itemsActions.updateItemSuccess,
  onDelete: itemsActions.deleteItemSuccess,
  onLoad: itemsActions.loadItemsSuccess
}, 'items')

function createItem(name: string): Function {
  return (dispatch: Function) => {
    const item = new Item({name: name})
    storage.create(item)
      .catch((error: *): void => dispatch(itemsActions.createItemError(error)))
  }
}

function updateItem(key: string, values: {}): Function {
  return (dispatch: Function) => {
    storage.update(key, values)
      .catch((error: *): void => dispatch(itemsActions.updateItemError(error)))
  }
}

function loadItems(): Function {
  return (dispatch: Function) => {
    storage.subscribe(dispatch)
  }
}

function unloadItems(): {} {
  storage.unsubscribe()
  return itemsActions.unloadItemsSuccess()
}

export default { createItem, updateItem, loadItems, unloadItems }
