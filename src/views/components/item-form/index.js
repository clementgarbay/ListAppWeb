import React, { Component } from 'react';

class ItemForm extends Component {
  constructor() {
    super()

    this.state = { title: '' }
  }

  clearInput() {
    this.setState({ title: '' })
  }

  onChange(event) {
    this.setState({ title: event.target.value })
  }

  onKeyUp() {
    // if (event.keyCode === 27) { // enter
    //   this.clearInput()
    // }
  }

  onSubmit(event) {
    event.preventDefault()
    const title = this.state.title.trim()
    if (title.length) {
      // this.props.createItem(title)
      this.clearInput()
    }
  }

  render() {
    return (
      <form className="item-form" onSubmit={this.onSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="item-form-input"
          maxLength="64"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="New item"
          type="text"
          value={this.state.title}
        />
      </form>
    )
  }
}

export default ItemForm
