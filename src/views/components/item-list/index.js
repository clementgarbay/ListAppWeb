import React, { PropTypes } from 'react'
import { List } from 'immutable'

import Item from '../item'

function ItemList({items, updateItem}): JSX.Element {
  let itemsElements = items.map((item: Item, index: number): JSX.Element => {
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

export default ItemList
