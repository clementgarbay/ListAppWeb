// @flow

import firebase from 'firebase'
import { firebaseDb } from '../firebase/firebase'

interface StorageCallbacks<T> {
  onAdd(elem: T): void,
  onChange(elem: T): void,
  onLoad(elems: Array<T>): void,
  onRemove(elem: T): void
}

export class FirebaseStorage<T> {

  _modelClass: T
  _actions: StorageCallbacks<T>
  _path: ?string
  _ref: firebase.database.Reference

  constructor(modelClass: T, actions: StorageCallbacks<T>, path: ?string = null) {
    this._modelClass = modelClass
    this._actions = actions
    this._path = path

    this._ref = firebaseDb.ref(this._path)
  }

  add(elem: T): Promise<*> {
    console.log('elem', elem)
    console.log('this._ref', this._ref)
    return new Promise((resolve: Function, reject: Function) => {
      console.log('ok')
      this._ref.push(elem, (error: ?*): void => {
        console.log('error', error)
        return error ? reject(error) : resolve()
      })
    });
  }

  remove(key: string): Promise<*> {
    return new Promise((resolve: Function, reject: Function) => {
      const path = (this._path || '') + '/' + key
      firebaseDb.ref(path)
        .remove((error: ?*): void => error ? reject(error) : resolve())
    });
  }

  set(key: string, value: *): Promise<*> {
    return new Promise((resolve: Function, reject: Function) => {
      const path = (this._path || '') + '/' + key
      firebaseDb.ref(path)
        .set(value, (error: ?*): void => error ? reject(error) : resolve());
    });
  }

  update(key: string, value: *): Promise<*> {
    return new Promise((resolve: Function, reject: Function) => {
      const path = (this._path || '') + '/' + key
      firebaseDb.ref(path)
        .update(value, (error: ?*): void => error ? reject(error) : resolve());
    });
  }

  subscribe(emit: Function) {
    let ref = firebaseDb.ref(this._path)
    let initialized = false
    let list = []

    console.log('emit', emit)

    ref.once('value', (test) => {
      initialized = true;
      console.log('test', test.val())
      emit(this._actions.onLoad(list))
    });

    ref.on('child_added', (snapshot: *) => {
      if (initialized) {
        emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
      } else {
        list.push(this.unwrapSnapshot(snapshot));
      }
    });

    ref.on('child_changed', (snapshot: *) => {
      emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
    });

    ref.on('child_removed', (snapshot: *) => {
      emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
    });

    // this._unsubscribe = () => ref.off()
  }

  // unsubscribe() {
  //   this._unsubscribe()
  // }

  unwrapSnapshot(snapshot: *): T {
    let attrs = snapshot.val();
    attrs.key = snapshot.key;
    return new this._modelClass(attrs)
  }
}
