import React, { Component } from 'react'
import { S } from '../classes/_utils'

import Nav from './Nav'

class Ham extends Component {
  burger = React.createRef()

  state = {
    active_nav: false
  }

  toggle_burger = () => {
    const br = this.burger.current || document.querySelector('.hamburger')
    const { active_nav } = this.state || this.props

    br.classList.toggle('is-active')

    if (!active_nav) {
      this.setState({ active_nav: true })
    } else {
      S('nav').style.setProperty('--top', '100%')
      setTimeout(() => {
        this.setState({ active_nav: false })
      }, 300)
    }
  }

  componentDidMount() {
    document.onkeydown = event => {
      if (event.which == 32) this.burger.current.click()
    }
  }

  render() {
    const { active_nav } = this.state
    return (
      <div className='navigation'>
        <div onClick={this.toggle_burger} ref={this.burger} className='hamburger hamburger--minus'>
          <div className='hamburger-box'>
            <div className='hamburger-inner' />
          </div>
        </div>
        {active_nav && <Nav toggle_burger={this.toggle_burger} active_nav={active_nav} />}
      </div>
    )
  }
}

export default Ham
