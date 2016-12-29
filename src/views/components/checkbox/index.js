// @flow

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames'

type CheckboxState = {
  withAnimation: boolean
};

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.state = { withAnimation: false }
  }

  state: CheckboxState

  componentDidMount() {
    this.setState({ withAnimation: true })
  }

  render(): React.Element<*> {
    return (
      <div className="checkbox-component">
        <input id={this.props.id} className="checkbox-component-input" type="checkbox" onClick={this.props.onClick} />
        <svg className={classNames('checkbox-component-icon', {'checkbox-component-icon--animate': this.state.withAnimation})} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {this.props.checked ? <path d="M16.667,62.167c3.109,5.55,7.217,10.591,10.926,15.75 c2.614,3.636,5.149,7.519,8.161,10.853c-0.046-0.051,1.959,2.414,2.692,2.343c0.895-0.088,6.958-8.511,6.014-7.3 c5.997-7.695,11.68-15.463,16.931-23.696c6.393-10.025,12.235-20.373,18.104-30.707C82.004,24.988,84.802,20.601,87,16"></path> : null}
        </svg>
      </div>
    )
  }
}
