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

  it(`ternary expression`, () => {
    let resA = ExpressionRun<{ root: { a: number; b: number } }>(
      '(root.a + root.b) > root.a ? 99 : 100',
      { root: { a: 1, b: 2 } }
    )
    expect(resA).toBe(99)

    let resB = ExpressionRun<{ root: { a: number; b: number } }>(
      '(root.a + root.b) < root.a ? 99 : 100',
      { root: { a: 1, b: 2 } }
    )
    expect(resB).toBe(100)
  })

  it(`value`, () => {
    let resA = ExpressionRun<{ root: { a: number[] } }>(
      'root.a[0]',
      { root: { a: [1] } }
    )
    expect(resA).toBe(1)
  })

})
