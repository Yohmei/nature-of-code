import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../objects/Canvas'
import Graph from '../../objects/Graph'
import canvas_hoc from '../../components/canvas_hoc'
import Renderer from '../../objects/Renderer'
import PVector from '../../objects/PVector'

const animate = function(args) {
  const { renderer } = args

  // A condition to stop the animation
  if (true) args.stop_anime = true

  // Animation here

  const start = new PVector(0, 0)
  const end = new PVector(100, -100)

  renderer.draw_line(start, end)

  args.time++
}

// It is important to keep 'function' keyword here because I want to get reference to 'this' inside it
const draw = function(canvas_el, animate) {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const renderer = new Renderer(canvas_obj)

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, renderer })
  }, 100)
}

class UnitVectors extends Component {
  static propTypes = {
    canvas_el: PropTypes.object,
    handle_mouse_move: PropTypes.func
  }

  name = UnitVectors

  mouse_x = 100
  mouse_y = -100

  handle_mouse_move = event => {
    this.mouse_x = event.clientX
    this.mouse_y = event.clientY
  }

  render() {
    const { canvas_el } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' onMouseMove={this.handle_mouse_move} />
      </main>
    )
  }
}

export default canvas_hoc(UnitVectors, animate, draw)
