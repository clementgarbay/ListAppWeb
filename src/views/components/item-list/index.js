import React, { PropTypes } from 'react'
import Item from '../item'

function ItemList({items, updateItem}) {
  let itemsElements = items.map((item, index) => {
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
  items: PropTypes.array.isRequired,
  updateItem: PropTypes.func.isRequired
}

export default ItemList
