import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../classes/Canvas'
import Graph from '../../classes/Graph'
import canvas_hoc from '../../components/canvas_hoc'
import Mover from '../../classes/Mover'
import PVector from '../../classes/PVector'
import Liquid from '../../classes/Liquid'

import { random } from '../../classes/_utils'

/**
 *
 * @param {Object} args
 * @param {Array.<Mover>} args.movers
 * @param {number} args.time
 * @param {boolean} args.stop_anime
 * @param {Liquid} args.liquid
 */
const animate = args => {
  const { movers, liquid } = args

  // A condition to stop the animation
  if (args.time == 1000) args.stop_anime = true

  liquid.display()

  // Animation here
  movers[0].renderer.draw_rectangle({ x: -500, y: -200, width: 1000, height: 400 })

  const gravity = PVector.from_angle(Math.PI * 0.5, 0.1)

  for (let i = 0; i < 3; i++) {
    const g = PVector.multiply_scalar_return_new(gravity, movers[i].mass)
    movers[i].apply_force({ force: g })

    movers[i].apply_water_resistance(liquid)
    movers[i].update_with_water()
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
    const liquid = new Liquid(canvas_obj, {
      x: -500,
      y: 100,
      height: 100,
      width: 1000,
      liquid_density: 1,
      drag_coefficient: 1.5
    })

    for (let i = 0; i < 3; i++) {
      movers[i] = new Mover(canvas_obj, { mass: 10 * (i + 1), location: new PVector(random(-300, 300), -100) })
    }

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, movers, liquid })
  }, 200)
}

class FluidResistance extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = FluidResistance

  render() {
    const { canvas_el } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' />
      </main>
    )
  }
}

export default canvas_hoc(FluidResistance, animate, draw)
