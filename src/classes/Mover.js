import toxi from 'toxiclibsjs'

import PVector from './PVector'
import Renderer from './Renderer'

import { random, map_range } from './_utils'

export default class Mover {
  constructor(canvas_obj) {
    this.perlin = new toxi.math.noise.PerlinNoise()
    this.location = new PVector(random(100), random(-100))
    this.velocity = new PVector(0, 0)
    this.acceleration = PVector.random2d()
    this.renderer = new Renderer(canvas_obj)
    this.top_speed = 2
    this.counter = 1
  }

  update = () => {
    // Totally random
    // this.acceleration = PVector.random2d()
    // ----
    // Perlin noise random
    const angle = Math.PI * map_range(this.perlin.noise(this.counter), 0, 1, 0, 200)
    this.acceleration = PVector.from_angle(angle)
    // ----
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.top_speed)
    this.location.add(this.velocity)
    this.counter++
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
