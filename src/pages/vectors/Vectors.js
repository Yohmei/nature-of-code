import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Canvas from '../../objects/Canvas'
import Graph from '../../objects/Graph'
import canvas_hoc from '../../components/canvas_hoc'
import Renderer from '../../objects/Renderer'
import PVector from '../../objects/PVector'

const animate = args => {
  const { renderer, location, velocity } = args

  // A condition to stop the animation
  if (args.time == 10) args.stop_anime = true

  // Animation here
  location.add(velocity)

  if (location.x > 200 || location.x < -200) {
    velocity.x = velocity.x * -1
  }
  if (location.y > 200 || location.y < -200) {
    velocity.y = velocity.y * -1
  }

  renderer.draw_circle(location)
  renderer.draw_line({ x: 0, y: 0 }, location)

  renderer.log(`
  Vector magnitude = ${location.magnitude()};
  x = ${location.x};
  y = ${location.y}
  `)

  args.time++
}

const draw = (canvas_el, animate) => {
  setTimeout(() => {
    const canvas_obj = new Canvas(canvas_el)
    const graph_obj = new Graph(canvas_obj)
    const location = new PVector(0, 0)
    const velocity = new PVector(6, -8)
    const renderer = new Renderer(canvas_obj, location)

    graph_obj.translate_coordinates()

    canvas_obj.update({ stop_anime: false, graph_obj, animate, time: 0, renderer, location, velocity })
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
