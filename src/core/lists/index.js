// @flow

import { firebaseDb } from '../firebase/firebase'
import { FirebaseDatabase } from '../firebase/firebase-database'
import { FirebaseDatabaseListener } from '../firebase/firebase-database-listener'
import * as listsActions from './actions'
import { ItemList } from '../models/item-list'


const PATH = 'lists'
const refToListen = firebaseDb.ref(PATH)

const database = new FirebaseDatabase(PATH)
const databaseListener = new FirebaseDatabaseListener(refToListen, {
  onCreate: listsActions.createListSuccess,
  onUpdate: listsActions.updateListSuccess,
  onDelete: listsActions.deleteListSuccess,
  onLoad: listsActions.loadListsSuccess
}, ItemList)

function createList(title: string): Function {
  return (dispatch: Function) => {
    const itemList = new ItemList({title: title})
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

function loadLists(): Function {
  return (dispatch: Function): Promise<*> => {
    return new Promise((resolve: Function, reject: Function) => {
      databaseListener.subscribe(dispatch, resolve, reject)
    })
  }
}

function unloadLists(): {} {
  databaseListener.unsubscribe()
  return listsActions.unloadListsSuccess()
}

function selectList(key: string): Function {
  return (dispatch: Function) => {
    dispatch(listsActions.selectListSuccess(key))
  }
}

export default { createList, updateList, loadLists, unloadLists, selectList }
