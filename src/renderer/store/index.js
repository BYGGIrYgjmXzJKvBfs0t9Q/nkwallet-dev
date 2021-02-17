import { Decimal } from 'decimal.js'
import nkn from 'nkn-sdk'
import axios from 'axios'

// transactions =
// filter ...state.walletInfo.data: (array of obj)
// ... data[i].hash
// ... data[i].payload (obj)

async function fetchWallet (input) {

  const suffix = `addresses/${input}`
  const walletData = await axios.get(`https://openapi.nkn.org/api/v1/${suffix}`)
  const transactionData = await axios.get(`https://openapi.nkn.org/api/v1/${suffix}/transactions`)
  const pre = transactionData.data.data
  const res = []

  for (let i=0; i<pre.length; i+=1) {
    const p = pre[i].payload
    const hash = pre[i].hash
    res.push({
      hash,
      sender: p.senderWallet,
      recipent: p.recipientWallet,
      type: p.payloadType,
      time: p.created_at,
      amount: p.amount,
      url: `https://nscan.io/transactions/${hash}`
    })
  }

  return {
    url: `https://nscan.io/${suffix}`,
    ...walletData.data,
    transactions: res,
    // beforeFilter: pre,
    // initialResponse: transactionData
  }
}

export const state = () => ({
  balance: null,
  wallet: {
    address: null,
  },
  status: null,
  walletInfo: null,
  transactionInfo: null
})

export const mutations = {
  setWallet (state, input) {state.wallet = input},
  setBalance (state, input) {state.balance = input},
  setStatus (state, input) {state.status = input},
  setWalletInfo (state, input) {state.walletInfo = input},
  setTransactionInfo (state, input) {state.transactionInfo = input}
}

export const actions = {

  createStatus ({ commit }, input) {
    commit('setStatus', input)
    setTimeout(() => {
      commit('setStatus', false)
    }, 2500)
  },

  async updateBalance ({ commit }) {
    const newBalance = await this.state.wallet.getBalance()
    const res = new Decimal(newBalance).toFixed()
    commit('setBalance', `${res} NKN`)
  },

  async updateWalletInfo ({ commit }) {
      const res = await fetchWallet(this.state.wallet.address)
      console.log('wallet info:', res)
      commit('setWalletInfo', res)
  },

  async createWallet ({ commit, dispatch }, input) {
    if (input && typeof input === 'string') {
      commit('setWallet', new nkn.Wallet({password: input}))
      dispatch('createStatus', '<SUCCESS> created wallet')
      dispatch('updateBalance')
    } else {
      dispatch('createStatus', '[ERROR] please enter a password')
    }
  },

  async openWallet ({ commit, dispatch }, input) {
    try {
      const res = await nkn.Wallet.fromJSON(input.wallet, {password: input.password})
      commit('setWallet', res)
      dispatch('updateBalance')
      dispatch('createStatus', '<SUCCESS> loaded wallet')
    } catch {
      dispatch('createStatus', '[ERROR] incorrect password')
    }
  }

  // restoreWallet ...

}
