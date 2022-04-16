import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../classes/Canvas'
import Graph from '../../classes/Graph'
import canvas_hoc from '../../components/canvas_hoc'
import Mover from '../../classes/Mover'
import PVector from '../../classes/PVector'

import { random } from '../../classes/_utils'
import Attractor from './../../classes/Attractor'

/**
 *
 * @param {Object} args
 * @param {Array.<Mover>} args.movers
 * @param {number} args.time
 * @param {boolean} args.stop_anime
 */
const animate = (args) => {
  const { movers, attractor } = args

  // A condition to stop the animation
  // if (args.time == 100) args.stop_anime = true

  // Animation here
  for (let i = 0; i < movers.length; i++) {
    const force = attractor.attract(movers[i])
    movers[i].apply_force({ force })
    movers[i].update_with_gravity()
    movers[i].display()
  }

  attractor.display()

  args.time++
}

const draw = (canvas_el, animate) => {
  const canvas_obj = new Canvas(canvas_el)
  const graph_obj = new Graph(canvas_obj)
  const movers = []
  const attractor = new Attractor(canvas_obj, { mass: 30 })

  for (let i = 0; i < 3; i++) {
    movers[i] = new Mover(canvas_obj, {
      mass: 7 * (i + 1),
      location: new PVector(random(-300, 300), -100),
      velocity: new PVector(random(3), random(3)),
    })
  }

  graph_obj.translate_coordinates()

  canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, movers, attractor })
}

class Gravity extends Component {
  static propTypes = {
    canvas_el: PropTypes.object,
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
