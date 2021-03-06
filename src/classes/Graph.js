export default class Graph {
  constructor(canvas_obj) {
    this.context = canvas_obj.context
    this.width = canvas_obj.width
    this.height = canvas_obj.height
    this.x0 = canvas_obj.x0 // x center
    this.y0 = canvas_obj.y0 // y center
    this.context.fillStyle = 'rgba(0, 0, 0, 1)'
    this.strokeStyle = '#000'
    this.context.font = '14px Open Sans'
  }

  draw_line_x = () => {
    this.context.beginPath()
    this.context.strokeStyle = this.strokeStyle
    this.context.moveTo(-this.x0, 0)
    this.context.lineTo(this.x0, 0)
    this.context.stroke()
    this.context.closePath()
  }

  draw_line_y = () => {
    this.context.beginPath()
    this.context.strokeStyle = this.strokeStyle
    this.context.moveTo(0, -this.y0)
    this.context.lineTo(0, this.y0)
    this.context.stroke()
    this.context.closePath()
  }

  translate_coordinates = () => {
    this.context.translate(this.x0, this.y0)
  }

  draw_graph = () => {
    // Draw the graph
    this.draw_line_x()
    this.draw_line_y()
    this.context.fillText('0', -12, 16)
  }
}
