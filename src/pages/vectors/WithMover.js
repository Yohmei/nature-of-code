import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../classes/Canvas'
import Graph from '../../classes/Graph'
import canvas_hoc from '../../components/canvas_hoc'
import Mover from '../../classes/Mover'

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
  if (args.time == 500) args.stop_anime = true

  // Animation here
  mover.update()
  mover.display()
  mover.check_edges()

  args.time++
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const mover = new Mover(canvas_obj)

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, mover })
  }, 100)
}

class WithMover extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = WithMover

  render() {
    const { canvas_el } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' />
      </main>
    )
  }
}

export default canvas_hoc(WithMover, animate, draw)
