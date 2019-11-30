import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../objects/Canvas'
import Graph from '../objects/Graph'
import canvas_hoc from './canvas_hoc'

const animate = (args, canvas_obj) => {
  const { graph_obj } = args
  const { context } = canvas_obj

  // A condition to stop the animation
  if (true) args.stop_anime = true

  // Redraw Graph every frame
  graph_obj.draw_graph()

  // Animation here
  context.beginPath()
  context.arc(100, 75, 30, 0, 2 * Math.PI)
  context.stroke()
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate })
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
