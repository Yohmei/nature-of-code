export default class PVector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(vector) {
    this.x = this.x + vector.x
    this.y = this.y + vector.y
  }
}
