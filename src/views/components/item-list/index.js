// @flow

import React, { PropTypes } from 'react'
import { List } from 'immutable'

import Item from '../item'

type ItemListState = {
  items: List<Item>,
  updateItem: Function
};

export default function ItemList({items, updateItem}: ItemListState): React.Element<*> {
  let itemsElements = items.map((item: Item, index: number): React.Element<*> => {
    return (
      <Item
        key={index}
        item={item}
        updateItem={updateItem}
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
  items: PropTypes.instanceOf(List).isRequired,
  updateItem: PropTypes.func.isRequired
}
