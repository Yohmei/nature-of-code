import PVector from './PVector'
import Renderer from './Renderer'
import { constrain } from './_utils'

export default class Attractor {
  constructor(canvas_obj, { location = new PVector(0, 0), mass = 1 } = {}) {
    this.renderer = new Renderer(canvas_obj)
    this.location = location
    this.mass = mass
    this.color = 'black'
  }

  attract = (mover) => {
    const G = 0.4
    const force = PVector.subtract_return_new(this.location, mover.location)
    const distance = constrain(force.magnitude())
    force.unit_vector()
    const strength = (G * this.mass * mover.mass) / (distance * distance)
    force.multiply_scalar(strength)

    return force
  }

  display = () => {
    this.renderer.draw_circle(this.location, { radius: this.mass + 20 }, 'yellow')
    this.renderer.draw_circle(this.location, { radius: this.mass }, this.color)
  }
}
