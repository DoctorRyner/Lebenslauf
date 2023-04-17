function sum(x: number, y: number): number {
  return x + y
}

test("The example test", () => {
  expect(sum(1, 2)).toBe(3)
})

export {}
