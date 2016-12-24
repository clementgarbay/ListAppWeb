import { FirebaseStorage } from '../storage/firebase-storage'
import * as listsActions from './actions'
import { ItemList } from '../models/item'


const storage = new FirebaseStorage(ItemList, {
  onCreate: listsActions.createListSuccess,
  onUpdate: listsActions.updateListSuccess,
  onDelete: listsActions.deleteListSuccess,
  onLoad: listsActions.loadListsSuccess
}, 'lists')

function createList(title: string): Function {
  return (dispatch: Function) => {
    const itemList = new ItemList({title: title})
    storage.create(itemList)
      .catch((error: *): void => dispatch(listsActions.createListError(error)))
  }
}

function updateList(key: string, values: {}): Function {
  return (dispatch: Function) => {
    storage.update(key, values)
      .catch((error: *): void => dispatch(listsActions.updateListError(error)))
  }
}

function loadLists(): Function {
  return (dispatch: Function) => {
    storage.subscribe(dispatch)
  }
}

function unloadLists(): {} {
  storage.unsubscribe()
  return listsActions.unloadListsSuccess()
}

export default { createList, updateList, loadLists, unloadLists }
