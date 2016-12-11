import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import ItemForm from '../item-form'
import ItemList from '../item-list'

class List extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired
  }

  constructor() {
    super()

    this.state = {
      items: [
        {
          id: 1,
          title: 'Acheter des oranges',
          completed: true
        },
        {
          id: 2,
          title: 'Prendre rdv chez le coiffeur',
          completed: true
        }
      ]
    }

    this.updateItem = this.updateItem.bind(this)
  }

  updateItem(selectedItem, changes) {
    const items = this.state.items
      .map(item => {
        if (item.id !== selectedItem.id) return item
        return Object.assign({}, item, changes)
      })

    this.setState({items: items})
  }

  render() {
    return (
      <Grid bsClass="list">
        <Row>
          <Col xs={12}>
            <h1 className="list-title">{this.props.list.title}</h1>
            <ItemForm />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ItemList items={this.state.items} updateItem={this.updateItem} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default List
