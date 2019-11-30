export default class Canvas {
  constructor(canvas_el) {
    this.canvas_el = canvas_el
    this.context = canvas_el.getContext('2d')
    this.width = canvas_el.width = canvas_el.parentElement.offsetWidth
    this.height = canvas_el.height = canvas_el.parentElement.offsetHeight
    this.x0 = canvas_el.width / 2
    this.y0 = canvas_el.height / 2
  }

  update = args => {
    const { stop_anime, animate } = args

    this.context.clearRect(-this.x0, -this.y0, this.width, this.height)

    animate(args)

    if (!stop_anime)
      window.requestAnimationFrame(_ => {
        return this.update(args)
      })
  }
}
