import React from 'react'

import page_hoc from '../components/page_hoc'

class Home extends React.Component {
  name = 'Home'

  render() {
    return (
      <main>
        <h1>NATURE OF CODE</h1>
      </main>
    )
  }
}

export default page_hoc(Home)
