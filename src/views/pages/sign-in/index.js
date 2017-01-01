// @flow

import type { Router } from 'react-router'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'react-fa'

import authDispatch from '../../../core/auth'
import { paths } from '../../routes'

type SignInProps = {
  signIn: Function,
  router: Router.InjectedRouter
};

export class SignIn extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.signIn = this.signIn.bind(this)
  }

  props: SignInProps

  signIn() {
    this.props.signIn()
      .then((): void => {
        this.props.router.replace(paths.ROOT) // TODO
      })
  }

  render(): React.Element<*> {
    return (
      <div className="signin">
        <div className="signin-header">
          <Icon className="signin-header-icon" name="check-square-o" />
        </div>
        <div className="signin-auth-providers">
          <button className="button" onClick={this.signIn} >
            <Icon className="button-icon" name="google" size="2x" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = Object.assign(
  {},
  authDispatch
)

export default connect(
  (): {} => ({}),
  mapDispatchToProps
)(SignIn)

