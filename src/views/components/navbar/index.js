// @flow

import React, { PropTypes } from 'react'
import { List } from 'immutable'

import ListButton from './list-button'

type NavBarState = {
  lists: List<ItemList>
};

export default function NavBar({lists}: NavBarState): React.Element<*> {
  const listsElements = lists.map((list: ItemList): React.Element<*> => {
    return <ListButton key={list.id} id={list.id} title={list.title} />
  })

  return (
    <div className="lists">
      {listsElements}
    </div>
  )
}

NavBar.propTypes = {
  lists: PropTypes.instanceOf(List).isRequired
}
