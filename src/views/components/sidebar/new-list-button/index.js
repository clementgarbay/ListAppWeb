// @flow

import React, { Component, PropTypes } from 'react';
import { Icon } from 'react-fa'

export default class NewListButton extends Component {
  static propTypes = {
    createList: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.prompt = this.prompt.bind(this)
  }

  prompt() {
    const title = prompt('New list title', '') // TODO: change it!
    if (title !== null) {
      this.props.createList(title)
    }
  }

  render(): React.Element<*> {
    return (
      <button className="list-button list-button-new" onClick={this.prompt}>
        <span className="list-button--title">Add a new list</span>
        <Icon className="list-button--icon" name="plus" />
      </button>
    )
  }
}
