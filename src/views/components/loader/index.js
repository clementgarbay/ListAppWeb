// @flow

import React from 'react';
import { Icon } from 'react-fa'

export default function Loader(): React.Element<*> {
  return (
    <div className="loader">
      <Icon spin name="circle-o-notch" />
    </div>
  )
}
