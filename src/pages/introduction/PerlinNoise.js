import React, { Component } from 'react'
import PropTypes from 'prop-types'
import toxi from 'toxiclibsjs'

import Canvas from '../../classes/Canvas'
import Graph from '../../classes/Graph'
import canvas_hoc from '../../components/canvas_hoc'

import { map_range } from '../../classes/_utils'

const animate = args => {
  const { graph_obj, perlin, time } = args

  // A condition to stop the animation
  if (time > 20) args.stop_anime = true

  let y = map_range(perlin.noise(time), 0, 1, 0, 30)

  // Animation here
  graph_obj.context.beginPath()
  graph_obj.context.arc(time * 10, -y, 1, 0, 2 * Math.PI)
  graph_obj.context.fill()
  args.time += 0.1
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)

    // Explore Perlin Noise http://haptic-data.com/toxiclibsjs/examples/perlin-noise-canvas
    const perlin = new toxi.math.noise.PerlinNoise()

    graph_obj.translate_coordinates()

    canvas_obj.update_no_clear({ stop_anime: false, graph_obj, animate, is_draw_graph: true, perlin, time: 0 })
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
