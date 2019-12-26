import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../classes/Canvas'
import Graph from '../../classes/Graph'
import canvas_hoc from '../../components/canvas_hoc'
import Mover from '../../classes/Mover'
import PVector from '../../classes/PVector'

import { random } from '../../classes/_utils'

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
  if (args.time == 1000) args.stop_anime = true

  // Animation here
  movers[0].renderer.draw_rectangle({ x: -500, y: -200, width: 1000, height: 400 })

  for (let i = 0; i < movers.length; i++) {
    movers[i].display()
    movers[i].check_edges({ right_edge: 500, left_edge: -500, bottom_edge: 200, top_edge: -200 })
  }

  args.time++
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const movers = []

    for (let i = 0; i < 1; i++) {
      movers[i] = new Mover(canvas_obj, { mass: 10 * (i + 1), location: new PVector(random(-300, 300), -100) })
    }

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, movers })
  }, 200)
}

class Gravity extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = Gravity

  render() {
    const { canvas_el } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' />
      </main>
    )
  }
}

export default canvas_hoc(Gravity, animate, draw)
