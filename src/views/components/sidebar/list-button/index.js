// @flow

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Icon } from 'react-fa'

import { getListRoute } from '../../../routes'

type ListButtonState = {
  id: string,
  title: string
};

export default function ListButton({id, title}: ListButtonState): React.Element<*> {
  return (
    <Link to={getListRoute(id)} className="list-button">
      <h4 className="list-button--title">{title}</h4>
      <Icon className="list-button--icon" name="angle-right" size="2x" />
    </Link>
  )
}

ListButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
