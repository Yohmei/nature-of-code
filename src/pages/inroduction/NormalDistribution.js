import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../objects/Canvas'
import Graph from '../../objects/Graph'
import canvas_hoc from '../../components/canvas_hoc'

import { Gaussian } from '../../objects/_utils'

const animate = args => {
  const { graph_obj, gaussian, time } = args
  const sd = 80
  const mean = 0
  const x = gaussian.random(mean, sd)

  // A condition to stop the animation
  if (time == 300) args.stop_anime = true

  // Animation here
  graph_obj.context.beginPath()
  graph_obj.context.fillStyle = 'rgba(0, 0, 0, 0.1)'
  graph_obj.context.arc(x, 0, 5, 0, 2 * Math.PI)
  graph_obj.context.fill()
  args.time += 1
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const gaussian = new Gaussian()

    graph_obj.translate_coordinates()

    canvas_obj.update_no_clear({ stop_anime: false, graph_obj, animate, is_draw_graph: true, gaussian, time: 0 })
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
