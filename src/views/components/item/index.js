import React, { Component, PropTypes } from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'

import Checkbox from '../checkbox'

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    updateItem: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.toggleStatus = this.toggleStatus.bind(this)
  }

  toggleStatus() {
    const checked = !this.props.item.completed
    this.props.updateItem(this.props.item, {completed: checked})
  }

  render() {
    return (
      <li className="item">
        <Checkbox checked={this.props.item.completed} onClick={this.toggleStatus} />
        <label htmlFor={'item-' + this.props.item.id} className={classNames('item-title', {'item-title--line-through': this.props.item.completed})}>
          {this.props.item.title}
        </label>
        <div className="item-tools">
          <button className="item-tools-button item-tools-button--edit">
            <Icon name="pencil" size="2x" />
          </button>
          <button className="item-tools-button item-tools-button--remove">
            <Icon name="trash-o" size="2x" />
          </button>
        </div>
      </li>
    )
  }
}

export default Item
