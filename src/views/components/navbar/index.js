import React, { PropTypes } from 'react'

import ListButton from './list-button'

export default function NavBar({lists}) {
  const listsElements = lists.map(list => {
    return <ListButton key={list.id} list={list} />
  })

  return (
    <div className="lists">
      {listsElements}
    </div>
  )
}

NavBar.propTypes = {
  lists: PropTypes.array.isRequired
}
