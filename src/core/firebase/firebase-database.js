// @flow

import { Record } from 'immutable'
import { firebaseDb } from './firebase'

type RecordType = Record<{}> & {toJS(): {}};

export class FirebaseDatabase<T: RecordType> {

  _path: ?string

  constructor(path: ?string = null) {
    this._path = path
  }

  create(elem: T): Promise<*> {
    return new Promise((resolve: Function, reject: Function) => {
      firebaseDb.ref(this._path)
        .push(elem.toJS(), (error: ?*): void => error ? reject(error) : resolve())
    })
  }

  update(id: string, values: {}): Promise<*> {
    return new Promise((resolve: Function, reject: Function) => {
      const path = (this._path || '') + '/' + id
      firebaseDb.ref(path)
        .update(values, (error: ?*): void => error ? reject(error) : resolve())
    })
  }

  delete(id: string): Promise<*> {
    return new Promise((resolve: Function, reject: Function) => {
      const path = (this._path || '') + '/' + id
      firebaseDb.ref(path)
        .remove((error: ?*): void => error ? reject(error) : resolve())
    })
  }
}
