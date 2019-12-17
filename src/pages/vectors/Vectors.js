import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../objects/Canvas'
import Graph from '../../objects/Graph'
import canvas_hoc from '../canvas_hoc'
import Renderer from '../../objects/Renderer'
import PVector from '../../objects/PVector'

const animate = args => {
  const { renderer, location, velocity } = args

  // A condition to stop the animation
  if (location.x > 200) args.stop_anime = true

  // Animation here
  location.add(velocity)
  renderer.vector = location
  renderer.draw_circle()
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const location = new PVector(0, 0)
    const velocity = new PVector(10, -3)
    const renderer = new Renderer(canvas_obj, location)

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, renderer, location, velocity })
  }, 100)
}

class Vectors extends Component {
  static propTypes = {
    canvas_el: PropTypes.object
  }

  name = Vectors

  render() {
    const { canvas_el } = this.props
    return (
      <main>
        <canvas ref={canvas_el} id='canvas' />
      </main>
    )
  }
}

export default canvas_hoc(Vectors, animate, draw)
