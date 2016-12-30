// @flow

import React, { Component, PropTypes } from 'react'
import { Icon } from 'react-fa'
import { connect } from 'react-redux'
import * as Immutable from 'immutable'

import listsDispatch from '../../../core/lists'
import { ItemList } from '../../../core/models/item-list'

import ListButton from './list-button'
import NewListButton from './list-button-new'


export class Sidebar extends Component {
  static propTypes = {
    listIdFromUrl: PropTypes.string,
    lists: PropTypes.instanceOf(Immutable.List).isRequired,
    loadLists: PropTypes.func.isRequired,
    selectList: PropTypes.func.isRequired,
    selectedList: PropTypes.instanceOf(ItemList),
    unloadLists: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadLists()
      .then((): void => this.props.selectList(this.props.listIdFromUrl))
  }

  componentDidUpdate(prevProps: {}) {
    if (this.props.listIdFromUrl !== prevProps.params.listId) {
      this.props.selectList(this.props.listIdFromUrl)
    }
  }

  componentWillUnmount() {
    this.props.unloadLists()
  }

  createList(name: string) {
    console.log('name', name)
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
          {listsElements}
          <NewListButton createList={this.createList} />
        </div>
      </div>
    )
  }
}

// Connect state and dispatch

const mapStateToProps = (state: State, other: {}): {} => ({
  lists: state.lists.lists
})

const mapDispatchToProps = Object.assign(
  {},
  listsDispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
