

const webPrefix = 'https://nscan.io/'
const prefix = 'https://openapi.nkn.org/api/v1/'

function transactions (input) {
  return `${prefix}addresses/${input}/transactions`
}

function addressInfo (input) {
  return `${prefix}addresses/${input}`
}