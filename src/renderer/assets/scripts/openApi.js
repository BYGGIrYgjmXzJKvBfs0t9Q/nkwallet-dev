import axios from 'axios'

const prefix = 'https://openapi.nkn.org/api/v1/'
const webPrefix = 'https://nscan.io/'

export async function fetchWallet (input) {
  const wallet = await axios.get(`${prefix}addresses/${input}`)
  const transactions = await axios.get(`${prefix}addresses/${input}/transactions`)
  const webUrl = `${webPrefix}addresses/${input}`
  console.log({ ...wallet.data, ...transactions.data, webUrl})
  return { ...wallet.data, ...transactions.data, webUrl}
}

export async function fetchTransaction (input) {
  const transaction = await axios.get(`${prefix}transactions/${input}`)
  const webUrl = `${webPrefix}transactions/${input}`
  console.log({ ...transaction.data, webUrl})
  return { ...transaction.data, webUrl}
}
