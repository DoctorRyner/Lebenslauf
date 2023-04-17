export function removeItem<T>(item: T, xs: T[]): T[] {
  return xs.filter((x) => x !== item)
}
