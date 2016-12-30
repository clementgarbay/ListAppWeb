// @flow

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as Immutable from 'immutable'

import listsDispatch from '../../../core/lists'
import { ItemList } from '../../../core/models/item-list'

import Sidebar from '../../components/sidebar'
import List from '../../components/list'

export class App extends Component {
  static propTypes = {
    listIdFromUrl: PropTypes.string,
    selectedList: PropTypes.instanceOf(ItemList)
  }

  render(): React.Element<*> {
    return (
      <Grid>
        <Row className="app">
          <Col xs={3} className="app-left">
            <Sidebar listIdFromUrl={this.props.listIdFromUrl} />
          </Col>
          <Col xs={9} className="app-right">
            {this.props.selectedList ? <List list={this.props.selectedList} /> : null}
          </Col>
        </Row>
      </Grid>
    )
  }
}


// Connect state and dispatch

const mapStateToProps = (state: State, other: {}): {} => ({
  listIdFromUrl: other.params.listId,
  selectedList: state.lists.selectedList
})

const mapDispatchToProps = Object.assign(
  {},
  listsDispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
