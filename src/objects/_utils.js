export const random = n => {
  return Math.floor(Math.random() * n)
}

export const gaussian_random = () => {
  let u = 0
  let v = 0

  while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()

  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

export const noise = x => {}
