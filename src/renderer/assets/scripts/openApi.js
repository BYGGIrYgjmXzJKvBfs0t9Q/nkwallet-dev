import axios from 'axios'

const prefix = 'https://openapi.nkn.org/api/v1/'
const webPrefix = 'https://nscan.io/'

export async function fetchWallet (input) {
  const suffix = `addresses/${input}`
  const wallet = await axios.get(`${prefix}${suffix}`)
  const transactions = await axios.get(`${prefix}${suffix}/transactions`)
  const webUrl = `${webPrefix}${suffix}`
  return { ...wallet.data, ...transactions.data, webUrl}
}

export async function fetchTransaction (input) {
  const suffix = `transactions/${input}`
  const transaction = await axios.get(`${prefix}${suffix}`)
  const webUrl = `${webPrefix}${suffix}`
  return { ...transaction.data, webUrl}
}
