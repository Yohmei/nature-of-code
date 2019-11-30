class Graph {
  constructor(obj) {
    this.context = obj.context
    this.canvas_width = obj.canvas_width
    this.canvas_height = obj.canvas_height
    this.global_center_x = obj.global_center_x // a point 'x' coordinate a circle moves around
    this.global_center_y = obj.global_center_y // a point 'y' coordinate a circle moves around
    this.context.fillStyle = '#000'
    this.context.strokeStyle = '#000'
    this.context.font = '14px Open Sans'
  }

  draw_line_x() {
    this.context.beginPath()
    this.context.moveTo(-this.global_center_x, 0)
    this.context.lineTo(this.global_center_x, 0)
    this.context.stroke()
  }

  draw_line_y() {
    this.context.beginPath()
    this.context.moveTo(2, -this.global_center_y)
    this.context.lineTo(2, this.global_center_y)
    this.context.stroke()
  }

  translate_coordinates() {
    this.context.translate(this.global_center_x, this.global_center_y)
  }

  draw_graph() {
    // Draw the graph
    this.draw_line_x()
    this.draw_line_y()
    this.context.fillText('0', -10, 16)
  }
}

export default Graph
