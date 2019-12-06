import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../objects/Canvas'
import Graph from '../objects/Graph'
import canvas_hoc from './canvas_hoc'

const gaussian_number = () => {
  let u = 0
  let v = 0

  while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()

  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

const animate = args => {
  const { graph_obj } = args
  const nd = gaussian_number()
  const sd = 80
  const mean = 0
  const x = sd * nd + mean

  // A condition to stop the animation
  if (args.counter == 100) args.stop_anime = true

  // Redraw Graph every frame
  graph_obj.draw_graph()

  // Animation here
  graph_obj.context.beginPath()
  graph_obj.context.arc(x, 0, 5, 0, 2 * Math.PI)
  graph_obj.context.fill()
  args.counter += 1
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)

    graph_obj.translate_coordinates()
    graph_obj.context.fillStyle = 'rgba(0, 0, 0, 0.1)'

    canvas_obj.update({ stop_anime: false, graph_obj, animate, counter: 0 })
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
