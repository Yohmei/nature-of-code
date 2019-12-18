export default class Renderer {
  constructor(canvas_obj, vector) {
    this.vector = vector
    this.context = canvas_obj.context
  }

  draw_circle = _ => {
    const { vector, context } = this
    const x = vector.x
    const y = vector.y
    const radius = 2
    const start_angle = 0
    const end_angle = Math.PI * 2

    context.beginPath()
    context.arc(x, y, radius, start_angle, end_angle) // x and y is a center
    context.fill()
  }

  draw_line = (x0, y0) => {
    const { context } = this
    const { x, y } = this.vector
    context.beginPath()
    context.moveTo(x0, y0)
    context.lineTo(x, y)
    context.stroke()
  }

  log = content => {
    this.context.fillText(content, 400, -200)
  }
}
