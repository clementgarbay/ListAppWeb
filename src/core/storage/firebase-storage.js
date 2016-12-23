// @flow

import firebase from 'firebase'
import { List, Record } from 'immutable'
import { firebaseDb } from '../firebase/firebase'

interface StorageCallbacks<T> {
  onCreate(elem: T): void,
  onUpdate(elem: T): void,
  onDelete(elem: T): void,
  onLoad(elems: List<T>): void
}

type RecordType = Record<{}> & {toJS(): {}};

export class FirebaseStorage<T: RecordType> {

  _modelClass: * // Class<T>
  _actions: StorageCallbacks<T>
  _path: ?string
  _ref: firebase.database.Reference

  constructor(modelClass: *, actions: StorageCallbacks<T>, path: ?string = null) {
    this._modelClass = modelClass
    this._actions = actions
    this._path = path

    this._ref = firebaseDb.ref(this._path)
  }

  create(elem: T): Promise<*> {
    return new Promise((resolve: Function, reject: Function) => {
      firebaseDb.ref(this._path)
        .push(elem.toJS(), (error: ?*): void => error ? reject(error) : resolve())
    })
  }

  update(key: string, values: {}): Promise<*> {
    return new Promise((resolve: Function, reject: Function) => {
      const path = (this._path || '') + '/' + key
      firebaseDb.ref(path)
        .update(values, (error: ?*): void => error ? reject(error) : resolve())
    })
  }

  delete(key: string): Promise<*> {
    return new Promise((resolve: Function, reject: Function) => {
      const path = (this._path || '') + '/' + key
      firebaseDb.ref(path)
        .remove((error: ?*): void => error ? reject(error) : resolve())
    })
  }

  subscribe(emit: Function) {
    let initialized = false

    // Note: on initialization, called after child_added
    this._ref.once('value', (snapshots: firebase.database.DataSnapshot) => {
      if (!initialized) {
        let list = new List()
        snapshots.forEach((snapshot: firebase.database.DataSnapshot) => {
          list = list.unshift(this.unwrapSnapshot(snapshot))
        })
        initialized = true
        emit(this._actions.onLoad(list))
      }
    })

    this._ref.on('child_added', (snapshot: firebase.database.DataSnapshot) => {
      if (initialized) {
        emit(this._actions.onCreate(this.unwrapSnapshot(snapshot)))
      }
    })

    this._ref.on('child_changed', (snapshot: firebase.database.DataSnapshot) => {
      if (initialized) {
        emit(this._actions.onUpdate(this.unwrapSnapshot(snapshot)))
      }
    })

    this._ref.on('child_removed', (snapshot: firebase.database.DataSnapshot) => {
      if (initialized) {
        emit(this._actions.onDelete(this.unwrapSnapshot(snapshot)))
      }
    })
  }

  unsubscribe() {
    this._ref.off()
  }

  unwrapSnapshot(snapshot: firebase.database.DataSnapshot): T {
    const attrs = snapshot.val()
    const test = new this._modelClass(attrs)
    return test
  }
}
