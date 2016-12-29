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
    return firebaseDb.ref(this._path).push(elem.toJS())
  }

  set(id: string, values: {}): Promise<*> {
    const path = (this._path || '') + '/' + id
    return firebaseDb.ref(path).set(values)
  }

  update(id: string, values: {}): Promise<*> {
    const path = (this._path || '') + '/' + id
    return firebaseDb.ref(path).update(values)
  }

  delete(id: string): Promise<*> {
    const path = (this._path || '') + '/' + id

    console.log('path', path)
    return firebaseDb.ref(path).remove()
  }
}
