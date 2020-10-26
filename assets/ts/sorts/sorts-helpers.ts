export const rndInt = (min = 0, max = 1) => {
  min = Math.floor(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const swap = <T>(array: T[], i: number, j: number) => {
  const t = array[i]
  array[i] = array[j]
  array[j] = t
}

export const defaultMapper = (n: number) => {
  return n
}

export const squareMapper = (n: number) => {
  return n * n
}

export const makeArray = (length: number, mapper = defaultMapper) => {
  const result = []
  for (let n = 1; n <= length; n += 1) {
    result.push(mapper(n))
  }
  return result
}

export const shuffleArray = <T>(array: T[]) => {
  const { length } = array
  for (let n = 1; n <= length * 2; n += 1) {
    swap(array, rndInt(0, length / 2), rndInt(length / 2, length))
  }
  return array
}

export const reverseArray = <T>(array: T[]) => {
  return array.reverse()
}
