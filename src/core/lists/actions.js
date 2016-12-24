import {
  CREATE_LIST_SUCCESS,
  CREATE_LIST_ERROR,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_ERROR,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_ERROR,
  LOAD_LISTS_SUCCESS,
  UNLOAD_LISTS_SUCCESS
} from './action-types'


export function createListSuccess(list: ItemList): {} {
  return {
    type: CREATE_LIST_SUCCESS,
    payload: list
  }
}

export function createListError(error: *): {} {
  return {
    type: CREATE_LIST_ERROR,
    payload: error
  }
}

export function updateListSuccess(list: ItemList): {} {
  return {
    type: UPDATE_LIST_SUCCESS,
    payload: list
  }
}

export function updateListError(error: *): {} {
  return {
    type: UPDATE_LIST_ERROR,
    payload: error
  }
}

export function deleteListSuccess(list: ItemList): {} {
  return {
    type: DELETE_LIST_SUCCESS,
    payload: list
  }
}

export function deleteListError(error: *): {} {
  return {
    type: DELETE_LIST_ERROR,
    payload: error
  }
}

export function loadListsSuccess(lists: List<ItemList>): {} {
  return {
    type: LOAD_LISTS_SUCCESS,
    payload: lists
  }
}

export function unloadListsSuccess(): {} {
  return {
    type: UNLOAD_LISTS_SUCCESS
  }
}
