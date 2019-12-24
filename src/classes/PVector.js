import { random } from './_utils'

export default class PVector {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  // Another constructor. Vector created by specifying angle and length of a vector
  static from_angle = (angle, length) => {
    if (typeof length === 'undefined') length = 1
    return new PVector(length * Math.cos(angle), length * Math.sin(angle), 0)
  }

  // returns a unit vector with random direction
  static random2d = () => {
    return PVector.from_angle(random(Math.PI * 2))
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

  limit = value => {
    if (this.magnitude() > value) {
      this.unit_vector()
      this.multiply_scalar(value)
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

  // useful for cases when the vector should be created with magnitude from previous location
  // may be
  static subtract_return = (vector1, vector2) => {
    return new PVector(vector1.x - vector2.x, vector1.y - vector2.y)
  }

  multiply_scalar = number => {
    this.x = this.x * number
    this.y = this.y * number
  }

  divide_scalar = number => {
    this.x = this.x / number
    this.y = this.y / number
  }

  static divide_scalar_return = (vector1, number) => {
    return new PVector(vector1.x / number, vector1.y / number)
  }
}
