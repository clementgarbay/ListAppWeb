import React, { Component, PropTypes } from 'react'
import * as Immutable from 'immutable'

import ListButton from './list-button'

export default class NavBar extends Component {
  static propTypes = {
    lists: PropTypes.instanceOf(Immutable.List).isRequired
  }

  render(): JSX.Element {
    const listsElements = this.props.lists.map((list: ItemList): JSX.Element => {
      return <ListButton key={list.id} id={list.id} title={list.title} />
    })

    return (
      <div className="lists">
        {listsElements}
      </div>
    )
  }
}
