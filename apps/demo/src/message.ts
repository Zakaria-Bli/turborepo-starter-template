import { add } from '@repo/math'

export function createMessage(): string {
  const result = add(2, 3)

  return `The result is ${result}.`
}
