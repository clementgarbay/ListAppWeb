import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as Immutable from 'immutable'

import listsDispatch from '../../../core/lists'
import { ItemList } from '../../../core/models/item-list'

import NavBar from '../../components/navbar'
import List from '../../components/list'

export class App extends Component {
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

  render(): JSX.Element {
    return (
      <Grid>
        <Row className="app">
          <Col xs={3} className="app-left">
            <NavBar lists={this.props.lists} />
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
  lists: state.lists.lists,
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
