import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import { Icon } from 'react-fa'

import { getListRoute } from '../../../routes'

export default function ListButton({list}) {
  return (
    <Link to={getListRoute(list.id)} className="list-button">
      <h4 className="list-button--title">{list.title}</h4>
      <Icon className="list-button--icon" name="angle-right" size="2x" />
    </Link>
  )
}

ListButton.propTypes = {
  list: PropTypes.object.isRequired
}
