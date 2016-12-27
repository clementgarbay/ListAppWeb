// @flow

import React, { Component, PropTypes } from 'react';


type ItemFormState = {
  name: string
};

export default class ItemForm extends Component {
  static propTypes = {
    createItem: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.state = { name: '' }

    this.clearInput = this.clearInput.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  state: ItemFormState

  clearInput() {
    this.setState({ name: '' })
  }

  onChange(event: Event) {
    this.setState({ name: event.target.value })
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 13) { // enter
      this.onSubmit(event)
    } else if (event.keyCode === 27) { // escape
      this.clearInput()
    }
  }

  onSubmit(event: Event) {
    event.preventDefault()
    const name = this.state.name.trim()
    if (name.length) {
      this.props.createItem(name)
      this.clearInput()
    }
  }

  render(): React.Element<*> {
    return (
      <form className="item-form" onSubmit={this.onSubmit} noValidate>
        <input
          type="text"
          value={this.state.name}
          autoFocus
          autoComplete="off"
          className="item-form-input"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="New item"
        />
      </form>
    )
  }
}
