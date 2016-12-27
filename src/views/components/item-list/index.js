// @flow

import React, { PropTypes } from 'react'
import { List } from 'immutable'

import Item from '../item'


export default function ItemList({items, updateItem, deleteItem}: typeof ItemList.propTypes): React.Element<*> {
  let itemsElements = items.map((item: Item): React.Element<*> => {
    return (
      <Item
        key={item.id}
        item={item}
        updateItem={updateItem}
        deleteItem={deleteItem}
      />
    )
  })

  return (
    <ul className="items">
      {itemsElements}
    </ul>
  )
}

ItemList.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.instanceOf(List).isRequired,
  updateItem: PropTypes.func.isRequired
}
