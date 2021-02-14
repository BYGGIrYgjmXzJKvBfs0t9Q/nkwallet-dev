import { Decimal } from 'decimal.js'
import nkn from 'nkn-sdk'
import {fetchWallet, fetchTransaction} from '@/assets/scripts/openApi.js'

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
    console.log('wallet info updating in 60 seconds')
    setTimeout(async () => { 
      const res = await fetchWallet(this.state.wallet.address)
      console.log('wallet info:', res)
      commit('setWalletInfo', res)
    }, 60 * 1000)
  },

  async updateTransactionInfo ({ commit }, input) {
    console.log('transaction info updating in 60 seconds')
    setTimeout(async () => {
      const res = await fetchTransaction(input)
      console.log('transaction info:', res)
      commit('setTransactionInfo', res)
    }, 60 * 1000)
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

}
