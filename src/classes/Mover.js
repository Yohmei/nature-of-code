import PVector from './PVector'
import Renderer from './Renderer'

import { random } from './_utils'

export default class Mover {
  constructor(canvas_obj) {
    this.location = new PVector(random(100), random(-100))
    this.velocity = new PVector(0, 0)
    this.acceleration = new PVector(0.01, 0.01)
    this.renderer = new Renderer(canvas_obj)
    this.top_speed = 2
  }

  update = () => {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.top_speed)
    this.location.add(this.velocity)
  }

  display = () => {
    this.renderer.draw_circle(this.location)
  }

  check_edges = () => {
    const { location } = this

    if (location.x > 100) this.location.x = -100
    else if (location.x < -100) this.location.x = 100

    if (location.y > 100) this.location.y = -100
    else if (location.y < -100) this.location.y = 100
  }
}
