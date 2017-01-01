// @flow

import type { Action } from '../../flowTypes'

import { Record } from 'immutable'
import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types'


const AuthState = Record({
  userId: null
})

export function authReducer(state: AuthState = new AuthState(), {type, payload}: Action): AuthState {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return state.merge({
        userId: (payload) ? payload.uid : null
      })

    case SIGN_OUT_SUCCESS:
      return new AuthState()

    default:
      return state
  }
}
