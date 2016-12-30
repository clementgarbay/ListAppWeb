// @flow

import type { ItemList } from '../../../core/models/item-list'

import React, { Component, PropTypes } from 'react'
import { Icon } from 'react-fa'
import * as Immutable from 'immutable'

import ListButton from './list-button'
import NewListButton from './new-list-button'
import Loader from '../loader'


export default class Sidebar extends Component {
  static propTypes = {
    createList: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    lists: PropTypes.instanceOf(Immutable.List).isRequired
  }

  constructor() {
    super()

    this.createList = this.createList.bind(this)
  }

  createList(title: string) {
    this.props.createList(title)
  }

  render(): React.Element<*> {
    const listsElements = this.props.lists.map((list: ItemList): React.Element<*> => {
      return <ListButton key={list.id} id={list.id} title={list.title} />
    })

    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <Icon className="sidebar-header-icon" name="check-square-o" size="4x" />
        </div>
        <div className="sidebar-lists">
          {this.props.isLoading && <Loader />}
          {!this.props.isLoading && listsElements}
          {!this.props.isLoading && <NewListButton createList={this.createList} />}
        </div>
      </div>
    )
  }
}
