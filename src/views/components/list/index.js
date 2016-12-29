// @flow

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Icon } from 'react-fa'
import * as Immutable from 'immutable'

import itemsDispatch from '../../../core/items'

import ItemForm from '../item-form'
import ItemList from '../item-list'
import Loader from '../loader'

type ListState = {
  isLoading: boolean
};

export class List extends Component {
  static propTypes = {
    canUndo: PropTypes.bool.isRequired,
    createItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
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
  }

  state: ListState

  componentWillMount() {
    this.loadItems(this.props.list.id)
  }

  componentDidUpdate(prevProps: {}) {
    if (this.props.list.id !== prevProps.list.id) {
      this.props.unloadItems()
      this.loadItems(this.props.list.id)
    }
  }

  componentWillUnmount() {
    this.props.unloadItems()
  }

  loadItems(listId: string) {
    this.setState({ isLoading: true })
    this.props.loadItems(listId)
      .then((): void => this.setState({ isLoading: false }))
  }

  createItem(name: string) {
    this.props.createItem(this.props.list.id, name)
  }

  render(): React.Element<*> {
    return (
      <Grid bsClass="list">
        <Row>
          <Col xs={12}>
            <div className="list-header">
              <h1 className="list-header-title">{this.props.list.title}</h1>
              {this.props.canUndo &&
                <button className="list-header-button" title="Undo last deletion" onClick={this.props.undoItemDeletion}>
                  <Icon name="undo" />
                </button>
              }
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


// Connect state and dispatch

const mapStateToProps = (state: State): {} => ({
  items: state.items.items,
  canUndo: state.items.lastItemDeleted !== null
})

const mapDispatchToProps = Object.assign(
  {},
  itemsDispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
