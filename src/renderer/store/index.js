import nkn from 'nkn-sdk'
import axios from 'axios'

async function fetchWallet (input) {

  const walletData = await axios.get(`https://openapi.nkn.org/api/v1/addresses/${input}`).then(res => res.data)
  const transactionData = await axios.get(`https://openapi.nkn.org/api/v1/addresses/${input}/transactions`).then(res => res.data)
  const transactionHistory = []

  for (let i=0; i<transactionData.data.length; i+=1) {
    const pl = transactionData.data[i].payload
    const hash = transactionData.data[i].hash
    transactionHistory.push({
      hash,
      sender: pl.senderWallet,
      recipient: pl.recipientWallet,
      type: pl.payloadType,
      time: pl.created_at,
      amount: pl.amount,
      url: `https://nscan.io/transactions/${hash}`
    })
  }

  return {
    address: walletData.address,
    balance: walletData.balance,
    url: `https://nscan.io/addresses/${input}`,
    transactions: {
      count: walletData.count_transactions,
      first: walletData.first_transaction,
      last: walletData.last_transaction,
      pages: {
        current: transactionData.current_page,
        next: transactionData.next_page_url,
        previous: transactionData.prev_page_url,
      },
      history: transactionHistory
    }
  }
}

export const state = () => ({
  wallet: {},
  info: {},
  status: false
})

export const mutations = {
  setWallet (state, input) {state.wallet = input},
  setStatus (state, input) {state.status = input},
  setInfo (state, input) {state.info = input},
}

export const actions = {
  createStatus ({ commit }, input) {
    commit('setStatus', input)
    setTimeout(() => {
      commit('setStatus', false)
    }, 2500)
  },

  async refreshWallet ({ commit }) {
    const res = await fetchWallet(this.state.wallet.address)
    commit('setInfo', res)
  },

  async createWallet ({ commit, dispatch }, input) {
    if (input && typeof input === 'string') {
      commit('setWallet', new nkn.Wallet({password: input}))
      dispatch('refreshWallet')
      dispatch('createStatus', '<SUCCESS> created wallet')
    } else {
      dispatch('createStatus', '[ERROR] please enter a password')
    }
  },

  async openWallet ({ commit, dispatch }, input) {
    try {
      const res = await nkn.Wallet.fromJSON(input.wallet, {password: input.password})
      commit('setWallet', res)
      dispatch('refreshWallet')
      dispatch('createStatus', '<SUCCESS> loaded wallet')
    } catch (e) {
      dispatch('createStatus', `[ERROR] ${e}`)
    }
  },

  // restore from seed (same as above, not used anywhere yet)
  async restoreWallet ({commit, dispatch}, input) {
    if (!input.seed || !input.password) {
      dispatch('createStatus', '[ERROR] please fill out all fields')
    } else {
    try {
      const res = await new nkn.Wallet({seed: input.seed, password: input.password})
      commit('setWallet', res)
      dispatch('refreshWallet')
      dispatch('createStatus', '<SUCCESS> loaded wallet')
    } catch (e) {
      dispatch('createStatus', `[ERROR] ${e}`)
    }
  }


  }

}
