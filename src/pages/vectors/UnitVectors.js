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

  const mouse = new PVector(mouse_x, mouse_y)
  renderer.vector = mouse

  renderer.draw_line(0, 0)

  args.time++
}

// It is important to keep 'function' keyword here because I want to get reference to 'this' inside it
const draw = function(canvas_el, animate) {
  const { mouse_x, mouse_y } = this
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const mouse = new PVector(mouse_x, mouse_y)
    const renderer = new Renderer(canvas_obj, mouse)

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, renderer })
  }, 100)
}

class UnitVectors extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = UnitVectors

  render() {
    const { canvas_el, handle_mouse_move } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' onMouseMove={handle_mouse_move} />
      </main>
    )
  }
}

export default canvas_hoc(UnitVectors, animate, draw)
