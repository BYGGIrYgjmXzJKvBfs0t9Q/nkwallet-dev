import { Decimal } from 'decimal.js'
import nkn from 'nkn-sdk'
import axios from 'axios'

// transactions =
// filter ...state.walletInfo.data: (array of obj)
// ... data[i].hash
// ... data[i].payload (obj)
//     ... senderWallet, recipientWallet, payloadType, created_at, amount

async function fetchWallet (input) {
  const prefix = 'https://openapi.nkn.org/api/v1/'
  const webPrefix = 'https://nscan.io/'
  const suffix = `addresses/${input}`

  const wallet = await axios.get(`${prefix}${suffix}`)
  const transactions = await axios.get(`${prefix}${suffix}/transactions`)
  const webUrl = `${webPrefix}${suffix}`

  const th = transactions.data.data
  // const fth = th.filter((rec) => {
  //   return rec.payload.payload
  // })

  const fth = []

  for (let i=0; i<th.length; i+=1) {
    const d = th[i].payload
    fth.push({
      sender: d.senderWallet,
      recipent: d.recipientWallet,
      type: d.payloadType,
      time: d.created_at,
      amount: d.amount
    })
  }
  
  // .filter((item) => {

    // const pl = item.payload
    // return item.payload
    
  // })

  return { 'filtered:': fth }


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
