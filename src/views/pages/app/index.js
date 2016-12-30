// @flow

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as Immutable from 'immutable'

import listsDispatch from '../../../core/lists'
import { ItemList } from '../../../core/models/item-list'

import Sidebar from '../../components/sidebar'
import List from '../../components/list'

type AppState = {
  isLoading: boolean
};

type AppProps = {
  createList: Function,
  listIdFromUrl: string,
  lists: Immutable.List<List>,
  loadLists: Function,
  selectList: Function,
  selectedList: ItemList,
  unloadLists: Function
};

export class App extends Component {
  static propTypes = {
    createList: PropTypes.func.isRequired,
    listIdFromUrl: PropTypes.string,
    lists: PropTypes.instanceOf(Immutable.List).isRequired,
    loadLists: PropTypes.func.isRequired,
    selectList: PropTypes.func.isRequired,
    selectedList: PropTypes.instanceOf(ItemList),
    unloadLists: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.state = { isLoading: true }
  }

  state: AppState

  componentWillMount() {
    this.props.loadLists()
      .then(() => {
        this.props.selectList(this.props.listIdFromUrl)
        this.setState({ isLoading: false })
      })
  }

  componentDidUpdate(prevProps: AppProps) {
    if (this.props.listIdFromUrl !== prevProps.listIdFromUrl) {
      this.props.selectList(this.props.listIdFromUrl)
    }
  }

  componentWillUnmount() {
    this.props.unloadLists()
  }

  props: AppProps

  render(): React.Element<*> {
    return (
      <Grid>
        <Row className="app">
          <Col xs={3} className="app-left">
            <Sidebar isLoading={this.state.isLoading} lists={this.props.lists} createList={this.props.createList} />
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

const mapStateToProps = (state: {}, other: {}): {} => ({
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
