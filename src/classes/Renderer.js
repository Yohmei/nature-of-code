export default class Renderer {
  constructor(canvas_obj) {
    this.context = canvas_obj.context
    this.strokeStyle = '#000'
  }

  draw_circle = vector => {
    const { context } = this
    const x = vector.x
    const y = vector.y
    const radius = 5
    const start_angle = 0
    const end_angle = Math.PI * 2

    context.beginPath()
    context.arc(x, y, radius, start_angle, end_angle) // x and y is a center
    context.stroke()
    context.closePath()
  }

  draw_line = (start_vector, end_vector) => {
    const { context } = this
    const x0 = start_vector.x
    const y0 = start_vector.y
    const x = end_vector.x
    const y = end_vector.y

    context.beginPath()
    context.moveTo(x0, y0)
    context.lineTo(x, y)
    context.stroke()
    context.closePath()
  }

  draw_rectangle = ({ x = -100, y = -100, width = 200, height = 200 } = {}) => {
    const { context } = this

    context.beginPath()
    context.strokeStyle = this.strokeStyle
    context.rect(x, y, width, height)
    context.stroke()
    context.closePath()
  }

  log = ({ content = 'Logging here ', x = 400, y = -200 } = {}) => {
    this.context.fillText(content, x, y)
  }
}
