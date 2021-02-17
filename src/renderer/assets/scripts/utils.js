
export function toDisplay (input) {
  if (typeof input === 'number') return input > 0 ? `${(input / 100000000)} NKN` : '0 NKN'
  return 'n/a'
}