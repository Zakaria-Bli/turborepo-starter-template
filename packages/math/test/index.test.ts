import { describe, expect, it } from 'vitest'

import { add, subtract } from '../src/index.js'

describe('math utilities', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2)
  })
})
