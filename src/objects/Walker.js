export default class Walker {
  constructor(canvas_obj) {
    this.x = 0
    this.y = 0
    this.context = canvas_obj.context
    this.context.fillStyle = '#000'
  }

  display = _ => {
    const { x, y, context } = this
    const radius = 5
    const start_angle = 0
    const end_angle = Math.PI * 2

    context.beginPath()
    context.arc(x, y, radius, start_angle, end_angle) // x and y is a center
    context.fill()
  }
}
