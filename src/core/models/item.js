// @flow

import { Record } from 'immutable'

export const Item = Record({
  id: null,
  name: null,
  completed: false,
  creationDate: null,
  listId: null
})
