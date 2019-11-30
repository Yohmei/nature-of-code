import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Graph from '../components/Graph'
import canvas_hoc from './canvas_hoc'
import { init_canvas, update } from '../components/utils'

const animate = options => {
  // A condition to stop the animation
  if (true) options.should_anime_end = true
  const { graph, ctx } = options.page_obj

  // Graph
  graph.draw_graph()

  // Animation here
  ctx.beginPath()
  ctx.arc(100, 75, 30, 0, 2 * Math.PI)
  ctx.stroke()
}

const draw = (canvas, page_obj) => {
  setTimeout(() => {
    const canvas_obj = init_canvas(canvas)
    page_obj.graph = new Graph(canvas_obj)
    page_obj.graph.translate_coordinates()
    page_obj.ctx = canvas_obj.context

    update(canvas_obj, page_obj.animate, { should_anime_end: false, page_obj })
  }, 100)
}

class RandomWalker extends Component {
  static propTypes = {
    canvas: PropTypes.object
  }

  name = RandomWalker

  render() {
    const { canvas } = this.props
    return (
      <main>
        <canvas ref={canvas} id='canvas' />
      </main>
    )
  }
}

export default canvas_hoc(RandomWalker, animate, draw)
