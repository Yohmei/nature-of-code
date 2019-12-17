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
}
