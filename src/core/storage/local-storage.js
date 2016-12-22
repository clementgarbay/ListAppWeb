import _ from 'lodash/fp'

// TODO: add flow typechecker (for generic type and interface)

export class Storage {

  static _storage = []

  add(elem) {
    return new Promise((resolve, reject) => {
      this._storage.push(elem)
      resolve(elem)
    })
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._storage = _.remove(elem => elem.id === id)(this._storage)
      resolve()
    })
  }

  update(id, key, value) {
    return new Promise((resolve, reject) => {
      if (key === 'id') reject('This key couldn\'t be updated')
      this._storage = _.map(elem => {
        if (elem.id === id) return _.set('key', value)(elem)
        return elem
      })(this._storage)
      resolve()
    })
  }
}
