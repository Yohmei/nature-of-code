import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../objects/Canvas'
import Graph from '../objects/Graph'
import canvas_hoc from './canvas_hoc'
import Walker from '../objects/Walker'

const animate = args => {
  const { walker } = args

  // A condition to stop the animation
  if (walker.x == 100) args.stop_anime = true

  // Animation here
  walker.step_tend_right()
  walker.display()
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const walker = new Walker(canvas_obj)

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, walker })
  }, 100)
}

class RandomWalker extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = RandomWalker

  render() {
    const { canvas_el } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' />
      </main>
    )
  }
}

export default canvas_hoc(RandomWalker, animate, draw)
