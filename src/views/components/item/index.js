// @flow

import React, { Component, PropTypes } from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'

import Checkbox from '../checkbox'

export default class Item extends Component {
  static propTypes = {
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    updateItem: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.toggleStatus = this.toggleStatus.bind(this)
    this.delete = this.delete.bind(this)
  }

  toggleStatus() {
    const checked = !this.props.item.completed
    this.props.updateItem(this.props.item.id, {completed: checked})
  }

  delete() {
    this.props.deleteItem(this.props.item.id)
  }

  render(): React.Element<*> {
    return (
      <li className="item">
        <Checkbox id={'item-' + this.props.item.id} checked={this.props.item.completed} onClick={this.toggleStatus} />
        <label htmlFor={'item-' + this.props.item.id} className={classNames('item-name', {'item-name--line-through': this.props.item.completed})}>
          {this.props.item.name}
        </label>
        <input type="text" className="item-input" value={this.props.item.name} placeholder={this.props.item.name} />
        <div className="item-tools">
          <button className="item-tools-button item-tools-button--edit">
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
