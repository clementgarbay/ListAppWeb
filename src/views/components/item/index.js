// @flow

import React, { Component, PropTypes } from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'

import Checkbox from '../checkbox'

type ItemState = {
  name: string,
  isBeingEdited: boolean
};

export default class Item extends Component {
  static propTypes = {
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    updateItem: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.state = {
      isBeingEdited: false
    }

    this.toggleStatus = this.toggleStatus.bind(this)
    this.toggleEditionMode = this.toggleEditionMode.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onNameKeyUp = this.onNameKeyUp.bind(this)
    this.onNameSubmit = this.onNameSubmit.bind(this)
    this.cancelChange = this.cancelChange.bind(this)
    this.delete = this.delete.bind(this)
  }

  state: ItemState

  componentWillMount() {
    this.setState({ name: this.props.item.name })
  }

  toggleStatus() {
    const checked = !this.props.item.completed
    this.props.updateItem(this.props.item.id, {completed: checked})
  }

  toggleEditionMode() {
    if (this.state.isBeingEdited) {
      this.cancelChange()
    } else {
      this.setState({ isBeingEdited: !this.state.isBeingEdited })
    }
  }

  onNameChange(event: Event) {
    this.setState({ name: event.target.value })
  }

  onNameKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 13) { // enter
      this.onNameSubmit(event)
    } else if (event.keyCode === 27) { // escape
      this.cancelChange()
    }
  }

  onNameSubmit(event: Event) {
    event.preventDefault()
    const name = this.state.name.trim()

    if (name.length) {
      this.props.updateItem(this.props.item.id, { name: name })
      this.setState({ isBeingEdited: false })
    }
  }

  cancelChange() {
    this.setState({
      name: this.props.item.name,
      isBeingEdited: false
    })
  }

  delete() {
    this.props.deleteItem(this.props.item.id)
  }

  render(): React.Element<*> {
    const itemName = this.state.isBeingEdited ? (
      <input type="text" className="item-input" value={this.state.name} placeholder={this.props.item.name} onChange={this.onNameChange} onKeyUp={this.onNameKeyUp} />
    ) : (
      <label htmlFor={'item-' + this.props.item.id} className={classNames('item-name', {'item-name--line-through': this.props.item.completed})}>
        {this.state.name}
      </label>
    )

    return (
      <li className="item">
        <Checkbox id={'item-' + this.props.item.id} checked={this.props.item.completed} onClick={this.toggleStatus} />
        {itemName}
        <div className="item-tools">
          <button className="item-tools-button item-tools-button--edit" onClick={this.toggleEditionMode}>
            <Icon name="pencil" size="2x" />
          </button>
          <button className="item-tools-button item-tools-button--remove" onClick={this.delete}>
            <Icon name="trash-o" size="2x" />
          </button>
        </div>
      </li>
    )
  }
}
