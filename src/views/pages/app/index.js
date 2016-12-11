import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import _ from 'lodash/fp'

import NavBar from '../../components/navbar'
import List from '../../components/list'

class App extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }

  constructor() {
    super()

    this.state = {
      lists: [{
        id: 1,
        title: 'Courses'
      }, {
        id: 2,
        title: 'Week-end'
      }]
    }
  }

  render() {
    const listId = parseInt(this.props.params.listId)
    const selectedList = _.find(list => list.id === listId)(this.state.lists)
    const listNotFound = _.isUndefined(selectedList)

    return (
      <Grid>
        <Row className="app">
          <Col xs={3} className="app-left">
            <NavBar lists={this.state.lists} />
          </Col>
          <Col xs={9} className="app-right">
            {(listId && !listNotFound) ? <List list={selectedList} /> : null}
            {(listId && listNotFound) ? <h2 className="list-not-found">Liste non trouvée</h2> : null}
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
