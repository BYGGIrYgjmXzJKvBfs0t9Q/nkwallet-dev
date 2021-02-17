
export function toDisplay (input) {
  const output = input ? `${(input / 100000000)} NKN` : 'n/a'
  return output
}