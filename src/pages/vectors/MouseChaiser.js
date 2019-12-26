import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../classes/Canvas'
import Graph from '../../classes/Graph'
import canvas_hoc from '../../components/canvas_hoc'
import Mover from '../../classes/Mover'
import PVector from '../../classes/PVector'

const mouse = new PVector(0, 0)

/**
 *
 * @param {Object} args
 * @param {Array.<Mover>} args.movers
 * @param {number} args.time
 * @param {boolean} args.stop_anime
 */
const animate = args => {
  const { movers } = args

  // A condition to stop the animation
  if (false) args.stop_anime = true

  // Animation here
  movers[0].renderer.draw_rectangle()

  for (let i = 0; i < movers.length; i++) {
    movers[i].update_with_mouse(mouse)
    movers[i].display()
    movers[i].check_edges()
  }

  args.time++
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const movers = []

    for (let i = 0; i < 10; i++) {
      movers[i] = new Mover(canvas_obj)
    }

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, movers })
  }, 100)
}

class MouseChaiser extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = MouseChaiser

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

export default canvas_hoc(MouseChaiser, animate, draw)
