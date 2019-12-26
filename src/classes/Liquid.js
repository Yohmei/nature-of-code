import Renderer from './Renderer'

export default class Liquid {
  constructor(canvas_obj, { x, y, width, height, liquid_density, drag_coefficient }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.liquid_density = liquid_density
    this.drag_coefficient = drag_coefficient // коеффициент лобового сопротивления объекта
    this.renderer = new Renderer(canvas_obj)
  }

  display = () => {
    this.renderer.draw_rectangle({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      method: 'fill',
      colour: '#012f6080'
    })
  }
}
