export const init_canvas = c => {
  return {
    canvas: c,
    context: c.getContext('2d'),
    canvas_width: (c.width = c.parentElement.offsetWidth),
    canvas_height: (c.height = c.parentElement.offsetHeight),
    global_center_x: c.width / 2,
    global_center_y: c.height / 2
  }
}

export const update = (canvas, fn, options) => {
  canvas.context.clearRect(-canvas.global_center_x, -canvas.global_center_y, canvas.canvas_width, canvas.canvas_height)

  fn(options)

  if (!options.should_anime_end)
    window.requestAnimationFrame(function() {
      return update(canvas, fn, options)
    })
}
