import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Nav extends Component {
  static propTypes = {
    toggle_burger: PropTypes.func
  }

  nav = React.createRef()

  render() {
    const { toggle_burger } = this.props
    return (
      <nav onClick={toggle_burger} ref={this.nav}>
        <div>
          <Link to='/'>Home</Link>
        </div>
        <div>
          <Link to='/random-walker'>Random Walker</Link>
        </div>
      </nav>
    )
  }
}
