import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Nav extends Component {
  static propTypes = {
    toggle_burger: PropTypes.func
  }

  state = {
    pages: ['Home', 'Random Walker', 'Normal Distribution']
  }

  nav = React.createRef()

  render() {
    const { toggle_burger } = this.props
    const { pages } = this.state

    return (
      <nav onClick={toggle_burger} ref={this.nav}>
        {pages.map((page, index) => {
          const page_link = page.toLowerCase().replace(' ', '-')

          return (
            <div key={index}>
              <Link to={page == 'home' ? '/' : `/${page_link}`}>{page}</Link>
            </div>
          )
        })}
      </nav>
    )
  }
}
