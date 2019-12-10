import React, { Component } from 'react'
import PropTypes from 'prop-types'
import toxi from 'toxiclibsjs'

import Canvas from '../objects/Canvas'
import Graph from '../objects/Graph'
import canvas_hoc from './canvas_hoc'

import { map_range } from '../objects/_utils'

const animate = args => {
  const { graph_obj, perlin, time } = args

  // A condition to stop the animation
  if (time > 10) args.stop_anime = true

  const n = perlin.noise(time)

  console.log(n)

  let y = map_range(perlin.noise(time), 0, 1, 0, 100)

  // Animation here
  graph_obj.context.beginPath()
  graph_obj.context.arc(time, -y, 2, 0, 2 * Math.PI)
  graph_obj.context.fill()
  args.time += 1
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const perlin = new toxi.math.noise.PerlinNoise()

    graph_obj.translate_coordinates()

    canvas_obj.update_no_clear({ stop_anime: false, graph_obj, animate, perlin, time: 0, is_draw_graph: true })
  }, 100)
}

class PerlinNoise extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = PerlinNoise

  render() {
    const { canvas_el } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' />
      </main>
    )
  }
}

export default canvas_hoc(PerlinNoise, animate, draw)
