import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Nav extends Component {
  static propTypes = {
    toggle_burger: PropTypes.func
  }

  state = {
    inro_pages: ['Home', 'Random Walker', 'Normal Distribution', 'Perlin Noise'],
    vector_pages: ['Vectors', 'Unit Vectors']
  }

  nav = React.createRef()

  render() {
    const { toggle_burger } = this.props
    const { inro_pages, vector_pages } = this.state

    return (
      <nav onClick={toggle_burger} ref={this.nav}>
        <div className='intro-links'>
          <div className='head'>INTRODUCTION</div>
          {inro_pages.map((page, index) => {
            const page_link = page.toLowerCase().replace(/\s/g, '-')

            return (
              <div key={index}>
                <Link to={page == 'Home' ? '/' : `/${page_link}`}>{page}</Link>
              </div>
            )
          })}
        </div>
        <div className='intro-links'>
          <div className='head'>VECTORS</div>
          {vector_pages.map((page, index) => {
            const page_link = page.toLowerCase().replace(/\s/g, '-')

            return (
              <div key={index}>
                <Link to={page == 'Home' ? '/' : `/${page_link}`}>{page}</Link>
              </div>
            )
          })}
        </div>
      </nav>
    )
  }
}
