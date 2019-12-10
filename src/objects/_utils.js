export const random = (min, max) => {
  const rand = Math.random()

  if (typeof min === 'undefined') {
    return rand
  } else if (typeof max === 'undefined') {
    if (min instanceof Array) {
      return min[Math.floor(rand * min.length)]
    } else {
      return rand * min
    }
  } else {
    if (min > max) {
      var tmp = min
      min = max
      max = tmp
    }

    return rand * (max - min) + min
  }
}

export class Gaussian {
  _gaussian_previous = false

  random = (mean, sd) => {
    let y1, y2, x1, x2, w

    if (this._gaussian_previous) {
      y1 = y2
      this._gaussian_previous = false
    } else {
      do {
        x1 = random(2) - 1
        x2 = random(2) - 1

        w = x1 * x1 + x2 * x2
      } while (w >= 1)

      w = Math.sqrt((-2 * Math.log(w)) / w)
      y1 = x1 * w
      y2 = x2 * w

      this._gaussian_previous = true
    }

    let m = mean || 0
    let s = sd || 1

    return y1 * s + m
  }
}

export const map_range = (value, curr_min, curr_max, new_min, new_max) => {
  return new_min + ((new_max - new_min) * (value - curr_min)) / (curr_max - curr_min)
}
