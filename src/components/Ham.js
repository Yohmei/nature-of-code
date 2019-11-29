import React, { Component } from 'react'

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
      // animate(br, -(window.innerWidth - br.offsetLeft) + 110)
      this.setState({ active_nav: true })
    } else {
      this.setState({ active_nav: false })
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
