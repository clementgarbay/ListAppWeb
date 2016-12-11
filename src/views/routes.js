import App from './pages/app'
import Login from './pages/login'

export const paths = {
  ROOT: '/',
  LIST: '/:listId',
  LOGIN: '/login'
}

export const getListRoute = listId => {
  return paths.LIST.replace(':listId', listId)
}

export const getRoutes = () => {
  return [
    {
      path: paths.LOGIN,
      component: Login
    },
    {
      path: paths.ROOT,
      component: App
    },
    {
      path: paths.LIST,
      component: App
    }
  ]
}


