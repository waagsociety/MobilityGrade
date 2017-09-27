export const get = (...path) => object => {
  let index = -1
  let result = object
  while (++index < path.length && result != null) {
    const key = path[index]
    result = result[key]
  }
  if (result != null) return result
}