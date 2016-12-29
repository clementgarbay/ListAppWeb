// @flow

import type { Action } from '../../flowTypes'

import { firebaseDb } from '../firebase/firebase'
import { FirebaseDatabase } from '../firebase/firebase-database'
import { FirebaseDatabaseListener } from '../firebase/firebase-database-listener'
import * as itemsActions from './actions'
import { Item } from '../models/item'


const PATH = 'items'

const database = new FirebaseDatabase(PATH)
let databaseListener = null

function createItem(listId: string, name: string): Function {
  return (dispatch: Function) => {
    const item = new Item({name: name, listId: listId, creationDate: new Date().toISOString()})
    database.create(item)
      .catch((error: *): void => dispatch(itemsActions.createItemError(error)))
  }
}

function updateItem(id: string, values: {}): Function {
  return (dispatch: Function) => {
    database.update(id, values)
      .catch((error: *): void => dispatch(itemsActions.updateItemError(error)))
  }
}

function deleteItem(id: string): Function {
  return (dispatch: Function) => {
    database.delete(id)
      .catch((error: *): void => dispatch(itemsActions.deleteItemError(error)))
  }
}

function undoItemDeletion(): Function {
  return (dispatch: Function, getState: Function) => {
    const item = getState().items.lastItemDeleted
    if (item) {
      database.set(item.id, item.toJS())
        .catch((error: *): void => dispatch(itemsActions.undoItemDeletionError(error)))
    }
  }
}

function loadItems(listId: string): Function {
  return (dispatch: Function): Promise<*> => {
    return new Promise((resolve: Function, reject: Function) => {
      const refToListen = firebaseDb.ref(PATH)
        .orderByChild('listId')
        .equalTo(listId)

      databaseListener = new FirebaseDatabaseListener(refToListen, {
        onCreate: itemsActions.createItemSuccess,
        onUpdate: itemsActions.updateItemSuccess,
        onDelete: itemsActions.deleteItemSuccess,
        onLoad: itemsActions.loadItemsSuccess
      }, Item)

      databaseListener.subscribe(dispatch, resolve, reject)
    })
  }
}

function unloadItems(): Action {
  if (databaseListener) databaseListener.unsubscribe()
  return itemsActions.unloadItemsSuccess()
}

export default { createItem, updateItem, deleteItem, undoItemDeletion, loadItems, unloadItems }
