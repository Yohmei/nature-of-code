import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../objects/Canvas'
import Graph from '../objects/Graph'
import canvas_hoc from './canvas_hoc'

const animate = args => {
  const { graph_obj } = args

  // A condition to stop the animation
  if (true) args.stop_anime = true

  // Redraw Graph every frame
  graph_obj.draw_graph()

  // Animation here
  graph_obj.context.beginPath()
  graph_obj.context.arc(0, 0, 5, 0, 2 * Math.PI)
  graph_obj.context.fill()
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate })
  }, 100)
}

class NormalDistribution extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = NormalDistribution

  render() {
    const { canvas_el } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' />
      </main>
    )
  }
}

export default canvas_hoc(NormalDistribution, animate, draw)
