import React, { Component } from 'react'

function page_hoc(Page) {
  // ...and returns another component...
  return class extends Component {
    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <div className={`${Page.name} page`}>
          <Page {...this.props} />
        </div>
      )
    }
  }
}

export default page_hoc
