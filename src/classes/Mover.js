import toxi from 'toxiclibsjs'

import PVector from './PVector'
import Renderer from './Renderer'

import { random, map_range } from './_utils'

export default class Mover {
  constructor(
    canvas_obj,
    {
      location = new PVector(random(-100, 100), random(-100, 100)),
      velocity = new PVector(0, 0),
      acceleration = new PVector(0, 0),
      mass = 1
    } = {}
  ) {
    this.perlin = new toxi.math.noise.PerlinNoise()
    this.renderer = new Renderer(canvas_obj)
    this.location = location
    this.velocity = velocity
    this.acceleration = acceleration
    this.mass = mass
    this.top_speed = 5
    this.counter = 1
  }

  apply_force = ({ force = new PVector(1, 1) } = {}) => {
    // acceleration = force / mass
    const acceleration = PVector.divide_scalar_return(force, this.mass)
    // adds up all the forces to the acceleration vector
    this.acceleration.add(acceleration)
  }

  update = () => {
    return null
  }

  update_with_acceleration = () => {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
  }

  update_with_random_acceleration = () => {
    // Totally random
    // this.acceleration = PVector.random2d()

    // Perlin noise random
    const angle = Math.PI * map_range(this.perlin.noise(this.counter), 0, 1, 0, 200)
    this.acceleration = PVector.from_angle(angle)
    // ----
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.top_speed)
    this.location.add(this.velocity)
    this.counter++
  }

  update_with_mouse = mouse => {
    const dir = PVector.subtract_return(mouse, this.location)

    dir.unit_vector()
    dir.multiply_scalar(0.5)

    this.acceleration = dir // the acceleration is constant = 0.5. look above
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.top_speed)
    this.location.add(this.velocity)
  }

  display = () => {
    this.renderer.draw_circle(this.location, { radius: this.mass })
  }

  check_edges = ({ right_edge = 100, left_edge = -100, bottom_edge = 100, top_edge = -100 } = {}) => {
    if (this.location.x > right_edge) {
      this.velocity.x *= -1
      this.location.x = right_edge
    } else if (this.location.x < left_edge) {
      this.velocity.x *= -1
      this.location.x = left_edge
    }

    if (this.location.y > bottom_edge) {
      this.velocity.y *= -1
      this.location.y = bottom_edge
    } else if (this.location.y < top_edge) {
      this.velocity.y *= -1
      this.location.y = top_edge
    }
  }
}
