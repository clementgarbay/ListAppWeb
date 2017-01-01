// @flow

import { firebaseDb } from '../firebase/firebase'
import { FirebaseDatabase } from '../firebase/firebase-database'
import { FirebaseDatabaseListener } from '../firebase/firebase-database-listener'
import { ItemList } from '../models/item-list'
import { getUserId } from '../auth'
import * as listsActions from './actions'

const PATH = 'lists'

const database = new FirebaseDatabase(PATH)
let databaseListener = null

function createList(title: string): Function {
  return (dispatch: Function, getState: Function) => {
    const itemList = new ItemList({title: title, owner: getUserId(getState()), creationDate: new Date().toISOString()})
    database.create(itemList)
      .catch((error: *): void => dispatch(listsActions.createListError(error)))
  }
}

function updateList(key: string, values: {}): Function {
  return (dispatch: Function) => {
    database.update(key, values)
      .catch((error: *): void => dispatch(listsActions.updateListError(error)))
  }
}

function deleteList(id: string): Function {
  return (dispatch: Function) => {
    database.delete(id)
      .catch((error: *): void => dispatch(listsActions.deleteListError(error)))
  }
}

function loadLists(): Function {
  return (dispatch: Function, getState: Function): Promise<*> => {
    return new Promise((resolve: Function, reject: Function) => {
      const refToListen = firebaseDb.ref(PATH)
        .orderByChild('owner')
        .equalTo(getUserId(getState()))

      databaseListener = new FirebaseDatabaseListener(refToListen, {
        onCreate: listsActions.createListSuccess,
        onUpdate: listsActions.updateListSuccess,
        onDelete: listsActions.deleteListSuccess,
        onLoad: listsActions.loadListsSuccess
      }, ItemList)

      databaseListener.subscribe(dispatch, resolve, reject)
    })
  }
}

function unloadLists(): {} {
  if (databaseListener) databaseListener.unsubscribe()
  return listsActions.unloadListsSuccess()
}

function selectList(key: string): Function {
  return (dispatch: Function) => {
    dispatch(listsActions.selectListSuccess(key))
  }
}

export default { createList, updateList, deleteList, loadLists, unloadLists, selectList }
