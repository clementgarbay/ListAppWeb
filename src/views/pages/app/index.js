// @flow

import type { Router } from 'react-router'
import type { State } from '../../../flowTypes'

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as Immutable from 'immutable'

import authDispatch from '../../../core/auth'
import listsDispatch from '../../../core/lists'
import { ItemList } from '../../../core/models/item-list'
import { paths } from '../../routes'

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
  signOut: Function,
  unloadLists: Function,
  router: Router.InjectedRouter
};

class App extends Component {
  static propTypes = {
    createList: PropTypes.func.isRequired,
    listIdFromUrl: PropTypes.string,
    lists: PropTypes.instanceOf(Immutable.List).isRequired,
    loadLists: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    selectList: PropTypes.func.isRequired,
    selectedList: PropTypes.instanceOf(ItemList),
    signOut: PropTypes.func.isRequired,
    unloadLists: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.state = { isLoading: true }

    this.signOut = this.signOut.bind(this)
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

  signOut() {
    this.props.signOut()
      .then((): void => this.props.router.replace(paths.SIGN_IN))
  }

  render(): React.Element<*> {
    return (
      <Grid>
        <Row className="app">
          <Col xs={3} className="app-left">
            <Sidebar isLoading={this.state.isLoading} lists={this.props.lists} createList={this.props.createList} signOut={this.signOut} />
          </Col>
          <Col xs={9} className="app-right">
            {this.props.selectedList ? <List list={this.props.selectedList} /> : null}
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state: State, other: {}): {} => ({
  listIdFromUrl: other.params.listId,
  lists: state.lists.lists,
  selectedList: state.lists.selectedList
})

const mapDispatchToProps = Object.assign(
  {},
  authDispatch,
  listsDispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
