import ExpressionRun from '../index'

describe(`Greeter`, () => {
  it(`simple`, () => {
    let res = ExpressionRun<{ root: { a: number; b: number } }>(
      'root.a === root.b',
      { root: { a: 1, b: 2 } }
    )
    expect(res).toBe(false)
  })

  it(`compute`, () => {
    let res = ExpressionRun<{ root: { a: number; b: number } }>(
      'root.a + root.b',
      { root: { a: 1, b: 2 } }
    )
    expect(res).toBe(3)
  })

  it(`complex`, () => {
    let res = ExpressionRun<{ root: { a: number; b: number } }>(
      '(root.a + root.b) > root.a',
      { root: { a: 1, b: 2 } }
    )
    expect(res).toBe(true)
  })
})
