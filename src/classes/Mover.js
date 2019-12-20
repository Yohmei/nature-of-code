import PVector from './PVector'
import Renderer from './Renderer'

import { random } from './_utils'

export default class Mover {
  constructor(canvas_obj) {
    this.location = new PVector(random(100), random(-100))
    this.velocity = new PVector(random(-2, 2), random(-2, 2))
    this.renderer = new Renderer(canvas_obj)
  }

  update = () => {
    this.location.add(this.velocity)
  }

  display = () => {
    this.renderer.draw_circle(this.location)
  }

  check_edges = () => {
    const { location } = this

    if (location.x > 100) this.location.x = 0
    else if (location.x < 0) this.location.x = 100

    if (location.y > 100) this.location.y = 0
    else if (location.y < 0) this.location.y = 100
  }
}
