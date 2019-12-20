export default class PVector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  magnitude = () => {
    const { x, y } = this
    return Math.sqrt(x * x + y * y)
  }

  unit_vector = () => {
    const m = this.magnitude()
    if (m != 0) {
      this.divide_scalar(m)
    }
  }

  add = vector => {
    this.x = this.x + vector.x
    this.y = this.y + vector.y
  }

  subtract = vector => {
    this.x = this.x - vector.x
    this.y = this.y - vector.y
  }

  multiply_scalar = number => {
    this.x = this.x * number
    this.y = this.y * number
  }

  divide_scalar = number => {
    this.x = this.x / number
    this.y = this.y / number
  }
}
