import {
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_ERROR,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_ERROR,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
  LOAD_ITEMS_SUCCESS,
  UNLOAD_ITEMS_SUCCESS
} from './action-types'


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

export function updateItemSuccess(item: Item): {} {
  return {
    type: UPDATE_ITEM_SUCCESS,
    payload: item
  }
}

export function updateItemError(error: *): {} {
  return {
    type: UPDATE_ITEM_ERROR,
    payload: error
  }
}

export function deleteItemSuccess(item: Item): {} {
  return {
    type: DELETE_ITEM_SUCCESS,
    payload: item
  }
}

export function deleteItemError(error: *): {} {
  return {
    type: DELETE_ITEM_ERROR,
    payload: error
  }
}

export function loadItemsSuccess(items: List<Item>): {} {
  return {
    type: LOAD_ITEMS_SUCCESS,
    payload: items
  }
}

export function unloadItemsSuccess(): {} {
  return {
    type: UNLOAD_ITEMS_SUCCESS
  }
}
