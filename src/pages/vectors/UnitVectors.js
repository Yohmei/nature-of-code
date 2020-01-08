import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../classes/Canvas'
import Graph from '../../classes/Graph'
import canvas_hoc from '../../components/canvas_hoc'
import Renderer from '../../classes/Renderer'
import PVector from '../../classes/PVector'

const mouse = new PVector(0, 0)

const animate = function(args) {
  const { renderer } = args

  // A condition to stop the animation
  if (false) args.stop_anime = true

  // Animation here

  const { x, y } = mouse

  const start = new PVector(0, 0)
  const end = new PVector(x, y)

  end.unit_vector()
  end.multiply_scalar(100)

  renderer.draw_line(start, end)

  args.time++
}

// It is important to keep 'function' keyword here because I want to get reference to 'this' inside it
const draw = function(canvas_el, animate) {
  const canvas_obj = new Canvas(canvas_el)
  const graph_obj = new Graph(canvas_obj)
  const renderer = new Renderer(canvas_obj)

  graph_obj.translate_coordinates()

  canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, renderer })
}

class UnitVectors extends Component {
  static propTypes = {
    canvas_el: PropTypes.object,
    handle_mouse_move: PropTypes.func
  }

  name = UnitVectors

  handle_mouse_move = event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    mouse.subtract({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
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
