import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as Immutable from 'immutable'

import { itemsActions } from '../../../core/items'

import ItemForm from '../item-form'
import ItemList from '../item-list'

export class List extends Component {
  static propTypes = {
    createItem: PropTypes.func.isRequired,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    list: PropTypes.object.isRequired,
    loadItems: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadItems()
    // this.props.filterTasks(this.props.location.query.filter);
  }

  render(): JSX.Element {
    return (
      <Grid bsClass="list">
        <Row>
          <Col xs={12}>
            <h1 className="list-title">{this.props.list.title}</h1>
            <ItemForm createItem={this.props.createItem} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ItemList items={this.props.items} updateItem={this.props.updateItem} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

// Connect state and dispatch

const mapStateToProps = state => ({
  items: state.items.items // TODO: review it
})

const mapDispatchToProps = Object.assign(
  {},
  itemsActions
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
