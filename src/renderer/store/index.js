import nkn from 'nkn-sdk'

export const state = () => ({
  balance: false,
  wallet: {
    address: false,
  },
  error: false
})

export const mutations = {
  setWallet (state, input) {
    state.wallet = input
  },
  setBalance (state, input) {
    state.balance = input
  },
  setError (state, input) {
    state.error = input
  }
}

export const actions = {
  createError ({ commit }, input) {
    commit('setError', input)
    setTimeout(() => {
      commit('setError', false)
    }, 2500)
  },
  async updateBalance ({ commit }) {
    console.log('updating balance')
    const res = await this.state.wallet.getBalance()
    console.log('got response', `${(res.d[0]/100) * (10 ** res.e)} NKN`)
    commit('setBalance', `${(res.d[0]/100) * (10 ** res.e)} NKN`)
  },
  async createWallet ({ commit, dispatch }, input) {
    if (input && typeof input === 'string') {
      commit('setWallet', new nkn.Wallet({password: input}))
      dispatch('updateBalance')
    } else {
      dispatch('createError', 'please enter a password')
    }
  },
  async openWallet ({ commit, dispatch }, input) {
    try {
      const res = await nkn.Wallet.fromJSON(input.wallet, {password: input.password})
      commit('setWallet', res)
      dispatch('updateBalance')
    } catch {
      dispatch('createError', 'incorrect password')
    }
  }
}
