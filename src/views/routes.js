// @flow

import App from './pages/app'
import SignIn from './pages/sign-in'
import { isAuthenticated } from '../core/auth'

export const paths = {
  ROOT: '/',
  LIST: '/list/:listId',
  SIGN_IN: '/signin'
}

function requireAuthentication(state: {}): Function {
  return (nextState: {}, replace: Function) => {
    if (!isAuthenticated(state)) {
      replace(paths.SIGN_IN)
    }
  }
}

export const getListRoute = (listId: string): string => {
  return paths.LIST.replace(':listId', listId)
}

export const getRoutes = (getState: Function): {} => {
  return {
    path: paths.ROOT,
    childRoutes: [
      {
        indexRoute: {
          component: App,
          onEnter: requireAuthentication(getState())
        }
      },
      {
        path: paths.SIGN_IN,
        component: SignIn,
        onEnter: (nextState: {}, replace: Function) => {
          if (isAuthenticated(getState())) {
            replace(paths.ROOT)
          }
        }
      },
      {
        path: paths.LIST,
        component: App,
        onEnter: requireAuthentication(getState())
      }
    ]
  }
}


