// @flow

import type { AuthState } from './core/auth/reducer'
import type { ItemsState } from './core/items/reducer'
import type { ListsState } from './core/lists/reducer'

export type ActionType = string;

export type Action = {
  type: ActionType,
  payload?: *
};

export type State = {
  routing: {},
  auth: AuthState,
  items: ItemsState,
  lists: ListsState
};
