// @flow

import type { List } from 'immutable'
import type { Action } from '../../flowTypes'

import { ItemList } from '../models/item-list'
import {
  CREATE_LIST_SUCCESS,
  CREATE_LIST_ERROR,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_ERROR,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_ERROR,
  LOAD_LISTS_SUCCESS,
  UNLOAD_LISTS_SUCCESS,
  SELECT_LIST_SUCCESS
} from './action-types'


export function createListSuccess(list: ItemList): Action {
  return {
    type: CREATE_LIST_SUCCESS,
    payload: list
  }
}

export function createListError(error: *): Action {
  return {
    type: CREATE_LIST_ERROR,
    payload: error
  }
}

export function updateListSuccess(list: ItemList): Action {
  return {
    type: UPDATE_LIST_SUCCESS,
    payload: list
  }
}

export function updateListError(error: *): Action {
  return {
    type: UPDATE_LIST_ERROR,
    payload: error
  }
}

export function deleteListSuccess(list: ItemList): Action {
  return {
    type: DELETE_LIST_SUCCESS,
    payload: list
  }
}

export function deleteListError(error: *): Action {
  return {
    type: DELETE_LIST_ERROR,
    payload: error
  }
}

export function loadListsSuccess(lists: List<ItemList>): Action {
  return {
    type: LOAD_LISTS_SUCCESS,
    payload: lists
  }
}

export function unloadListsSuccess(): Action {
  return {
    type: UNLOAD_LISTS_SUCCESS
  }
}

export function selectListSuccess(key: string): Action {
  return {
    type: SELECT_LIST_SUCCESS,
    payload: key
  }
}
