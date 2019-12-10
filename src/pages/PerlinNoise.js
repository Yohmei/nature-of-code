import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../objects/Canvas'
import Graph from '../objects/Graph'
import canvas_hoc from './canvas_hoc'

import { noise } from '../objects/_utils'

import toxi from 'toxiclibsjs'

const animate = args => {
  const { graph_obj } = args

  // A condition to stop the animation
  if (true) args.stop_anime = true

  // Animation here
  graph_obj.context.beginPath()
  graph_obj.context.arc(0, 0, 2, 0, 2 * Math.PI)
  graph_obj.context.fill()
  args.counter += 1
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const perlin = new toxi.math.noise.PerlinNoise()

    console.log(perlin.noise(1))

    graph_obj.translate_coordinates()

    canvas_obj.update_no_clear({ stop_anime: false, graph_obj, animate, counter: 0, is_draw_graph: true })
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
