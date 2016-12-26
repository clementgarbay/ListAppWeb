import { Record } from 'immutable'

export const Item = new Record({
  id: null,
  name: null,
  completed: false,
  creationDate: null,
  listId: null
})
