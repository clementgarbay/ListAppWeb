// @flow

import firebase from 'firebase'
import { firebaseAuth } from '../firebase/firebase'
import * as authActions from './actions'


export function getUserId(state: {}): ?string {
  return state.auth.userId
}

export function isAuthenticated(state: {}): boolean {
  return getUserId(state) !== null
}

export function initAuth(dispatch: Function): Promise<*> {
  return new Promise((resolve: Function, reject: Function) => {
    firebaseAuth.onAuthStateChanged(
      (user: firebase.User) => {
        dispatch(authActions.signInSuccess(user))
        resolve()
      },
      (error: *): void => reject(error)
    )
  })
}

function signIn(): Function {
  return (dispatch: Function): Promise<*> => {
    return new Promise((resolve: Function, reject: Function) => {
      firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result: firebase.auth.UserCredential) => {
          dispatch(authActions.signInSuccess(result.user))
          resolve()
        })
        .catch((error: *) => {
          dispatch(authActions.signInError(error))
          reject(error)
        })
    })
  }
}

function signOut(): Function {
  return (dispatch: Function): Promise<*> => {
    return new Promise((resolve: Function, reject: Function) => {
      firebaseAuth.signOut()
        .then(() => {
          dispatch(authActions.signOutSuccess())
          resolve()
        })
        .catch((error: *) => {
          dispatch(authActions.signOutError(error))
          reject(error)
        })
    })
  }
}

export default { signIn, signOut }
