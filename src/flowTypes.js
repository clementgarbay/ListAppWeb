// @flow

export type ActionType = string;

export type Action = {
  type: ActionType,
  payload: ?*
};

export type RecordType = Record<{}> & {toJS(): {}};
