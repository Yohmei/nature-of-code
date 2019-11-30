import React, { Component } from 'react'

function page_hoc(Page, animate, draw) {
  // ...and returns another component...
  return class extends Component {
    canvas = React.createRef()

    constructor(props) {
      super(props)
      this.animate = animate
      this.draw = draw
    }

    componentDidMount() {
      const c = this.canvas.current
      window.addEventListener('resize', () => this.draw(c, this))
      this.draw(c, this)
    }

    componentWillUnmount = () => {
      window.removeEventListener('resize', () => this.draw(this.canvas.current, this))
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <div className={`${Page.name} page canvas-page`}>
          <Page canvas={this.canvas} {...this.props} />
        </div>
      )
    }
  }
}

export default page_hoc
