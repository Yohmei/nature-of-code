import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../classes/Canvas'
import Graph from '../../classes/Graph'
import canvas_hoc from '../../components/canvas_hoc'
import Mover from '../../classes/Mover'
import PVector from '../../classes/PVector'

const gravity = PVector.from_angle(Math.PI * 0.5, 0.5)
const wind = PVector.from_angle(Math.PI, 0.5)

/**
 *
 * @param {Object} args
 * @param {Mover} args.mover
 * @param {number} args.time
 * @param {boolean} args.stop_anime
 */
const animate = args => {
  const { mover } = args

  // A condition to stop the animation
  if (false) args.stop_anime = true

  // Animation here
  mover.renderer.draw_rectangle({ x: -500, y: -200, width: 1000, height: 400 })

  mover.update()
  mover.display()
  mover.check_edges({ right_edge: 500, left_edge: -500, bottom_edge: 200, top_edge: -200 })

  args.time++
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const mover = new Mover(canvas_obj, { mass: 5 })

    mover.apply_force({ force: gravity })

    setTimeout(() => {
      mover.apply_force({ force: wind })
    }, 3000)

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, mover })
  }, 200)
}

class Friction extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = Friction

  render() {
    const { canvas_el } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' />
      </main>
    )
  }
}

export default canvas_hoc(Friction, animate, draw)
