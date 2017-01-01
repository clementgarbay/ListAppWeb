// @flow

import type { firebase } from 'firebase'
import type { Action } from '../../flowTypes'

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR
} from './action-types'


export function signInSuccess(user: firebase.User): Action {
  return {
    type: SIGN_IN_SUCCESS,
    payload: user
  }
}

export function signInError(error: *): Action {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  }
}

export function signOutSuccess(): Action {
  return {
    type: SIGN_OUT_SUCCESS,
    payload: null
  }
}

export function signOutError(): Action {
  return {
    type: SIGN_OUT_ERROR,
    payload: null
  }
}
