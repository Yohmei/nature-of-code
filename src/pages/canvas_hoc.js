import React, { Component } from 'react'

function page_hoc(Page, animate, draw) {
  // ...and returns another component...
  return class extends Component {
    canvas_el = React.createRef()

    constructor(props) {
      super(props)
      this.animate = animate
      this.draw = draw
    }

    componentDidMount() {
      const canvas_el = this.canvas_el.current
      window.addEventListener('resize', () => this.draw(canvas_el, this.animate))
      this.draw(canvas_el, this.animate)
    }

    componentWillUnmount = () => {
      window.removeEventListener('resize', () => this.draw(this.canvas_el.current, this.animate))
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <div className={`${Page.name} page canvas-page`}>
          <Page canvas_el={this.canvas_el} {...this.props} />
        </div>
      )
    }
  }
}

export default page_hoc
