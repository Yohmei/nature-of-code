import React from 'react'

class Home extends React.Component {
  name = 'Home'

  render() {
    return (
      <div className={`${this.name} page`}>
        <main>
          <h1>NATURE OF CODE</h1>
        </main>
      </div>
    )
  }
}

export default Home
