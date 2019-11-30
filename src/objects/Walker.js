import { random } from './_utils'

export default class Walker {
  constructor(canvas_obj) {
    this.x = 0
    this.y = 0
    this.radius = 2
    this.context = canvas_obj.context
    this.context.fillStyle = '#000'
  }

  display = _ => {
    const { x, y, radius, context } = this
    const start_angle = 0
    const end_angle = Math.PI * 2

    context.beginPath()
    context.arc(x, y, radius, start_angle, end_angle) // x and y is a center
    context.fill()
  }

  step_9_directions = _ => {
    // 8 directional step and the possibility to stay in place = 9 possibilities
    const step_x = random(3) - 1
    const step_y = random(3) - 1

    this.x += step_x
    this.y += step_y
  }

  step_tend_right = _ => {
    const r = Math.random()

    // A 40% chance of moving to the right!
    if (r < 0.4) {
      this.x++
    } else if (r < 0.6) {
      this.x--
    } else if (r < 0.8) {
      this.y++
    } else {
      this.y--
    }
  }
}
