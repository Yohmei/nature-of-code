import React, { Component } from 'react'

import page_hoc from '../components/page_hoc'

class RandomWalker extends Component {
  name = RandomWalker

  render() {
    return (
      <main>
        <h1>Random Walker</h1>
      </main>
    )
  }
}

export default page_hoc(RandomWalker)
