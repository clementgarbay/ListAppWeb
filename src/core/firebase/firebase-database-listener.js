// @flow

import { List } from 'immutable'
import firebase from 'firebase'

import { firebaseDb } from './firebase'

interface ActionsFn<T> {
  onCreate(elem: T): void,
  onUpdate(elem: T): void,
  onDelete(elem: T): void,
  onLoad(elems: List<T>): void
}

export class FirebaseDatabaseListener<T> {

  _modelClass: * // Class<T>
  _ref: firebase.database.Reference
  _actions: ActionsFn<T>

  constructor(ref: ?firebase.database.Reference = null, actions: ActionsFn<T>, modelClass: *) {
    this._ref = ref || firebaseDb.ref()
    this._actions = actions
    this._modelClass = modelClass
  }

  subscribe(emit: Function, resolveOnInit: Function = () => {}, rejectOnInit: Function = () => {}) {
    let initialized = false

    // Note: on initialization, called after child_added
    this._ref.once('value', (snapshots: firebase.database.DataSnapshot) => {
      if (!initialized) {
        let elements = new List()
        snapshots.forEach((snapshot: firebase.database.DataSnapshot) => {
          elements = elements.unshift(this.unwrapSnapshot(snapshot))
        })
        initialized = true
        emit(this._actions.onLoad(elements))
        resolveOnInit(elements)
      }
    }, (error: Error): void => rejectOnInit(error))

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
    attrs.id = snapshot.key
    return new this._modelClass(attrs)
  }
}
