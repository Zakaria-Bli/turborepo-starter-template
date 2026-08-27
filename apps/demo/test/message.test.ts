import { describe, expect, it } from 'vitest'

import { createMessage } from '../src/message.js'

describe('createMessage', () => {
  it('returns a message containing the calculation result', () => {
    expect(createMessage()).toBe('The result is 5.')
  })
})
