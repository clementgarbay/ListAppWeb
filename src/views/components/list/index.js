// @flow

import type { State } from '../../../flowTypes'
import * as ItemListModel from '../../../core/models/item-list'
import * as ItemModel from '../../../core/models/item'

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Icon } from 'react-fa'
import * as Immutable from 'immutable'

import itemsDispatch from '../../../core/items'
import listsDispatch from '../../../core/lists'

import ItemForm from '../item-form'
import ItemList from '../item-list'
import Loader from '../loader'

type ListState = {
  isLoading: boolean
};

type ListProps = {
  canUndo: boolean,
  createItem: Function,
  deleteItem: Function,
  deleteList: Function,
  items: Immutable.List<ItemModel.Item>,
  list: ItemListModel.ItemList,
  loadItems: Function,
  undoItemDeletion: Function,
  unloadItems: Function,
  updateItem: Function
};

class List extends Component {
  static propTypes = {
    canUndo: PropTypes.bool.isRequired,
    createItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    list: PropTypes.object.isRequired,
    loadItems: PropTypes.func.isRequired,
    undoItemDeletion: PropTypes.func.isRequired,
    unloadItems: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.state = { isLoading: true }

    this.loadItems = this.loadItems.bind(this)
    this.createItem = this.createItem.bind(this)
    this.deleteList = this.deleteList.bind(this)
  }

  state: ListState

  componentWillMount() {
    this.loadItems(this.props.list.id)
  }

  componentDidUpdate(prevProps: ListProps) {
    if (this.props.list.id !== prevProps.list.id) {
      this.props.unloadItems()
      this.loadItems(this.props.list.id)
    }
  }

  componentWillUnmount() {
    this.props.unloadItems()
  }

  props: ListProps

  loadItems(listId: string) {
    this.setState({ isLoading: true })
    this.props.loadItems(listId)
      .then((): void => this.setState({ isLoading: false }))
  }

  createItem(name: string) {
    this.props.createItem(this.props.list.id, name)
  }

  deleteList() {
    const res = confirm('Are you sure you want to delete this list and all associated items ?')

    if (res) {
      this.props.deleteList(this.props.list.id)
    }
  }

  render(): React.Element<*> {
    return (
      <Grid bsClass="list">
        <Row>
          <Col xs={12}>
            <div className="list-header">
              <h1 className="list-header-title">{this.props.list.title}</h1>
              <div className="list-header-tools">
                {this.props.canUndo &&
                  <button className="list-header-tools-button" title="Undo last deletion" onClick={this.props.undoItemDeletion}>
                    <Icon name="undo" />
                  </button>
                }
                <button className="list-header-tools-button list-header-tools-button--delete" title="Delete this list" onClick={this.deleteList}>
                  <Icon name="trash-o" />
                </button>
              </div>
            </div>
            <ItemForm createItem={this.createItem} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.state.isLoading && <Loader />}
            {(!this.props.items.size && !this.state.isLoading) && <p className="no-items-found">No items found</p>}
            <ItemList items={this.props.items} updateItem={this.props.updateItem} deleteItem={this.props.deleteItem} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state: State): {} => ({
  items: state.items.items,
  canUndo: state.items.lastItemDeleted !== null
})

const mapDispatchToProps = Object.assign(
  {},
  itemsDispatch,
  listsDispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
