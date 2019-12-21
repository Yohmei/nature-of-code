import toxi from 'toxiclibsjs'

import PVector from './PVector'
import Renderer from './Renderer'

import { random, map_range } from './_utils'

export default class Mover {
  constructor(canvas_obj) {
    this.perlin = new toxi.math.noise.PerlinNoise()
    this.location = new PVector(random(-100, 100), random(-100, 100))
    this.velocity = new PVector(0, 0)
    this.acceleration = PVector.random2d()
    this.renderer = new Renderer(canvas_obj)
    this.top_speed = 2
    this.counter = 1
  }

  apply_force = ({ force = new PVector(1, 1), mass = 1 } = {}) => {
    force.divide_scalar(mass)
    this.acceleration = force
  }

  update = () => {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.top_speed)
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

    this.acceleration = dir
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
