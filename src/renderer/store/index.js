import nkn from 'nkn-sdk'

export const state = () => ({
  balance: 'waiting...',
  wallet: {
    address: 'waiting...'
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
    // todo: refresh timeout
    setTimeout(() => {
      commit('setError', false)
    }, 2500)
  },
  async createWallet ({ commit, dispatch }, password) {
    if (password && typeof password === 'string') {
      commit('setWallet', new nkn.Wallet({password}))
      const res = await this.state.wallet.getBalance()
      commit('setBalance', `${(res.d[0]/100) * (10 ** res.e)} NKN`)
    } else {
      dispatch('createError', 'please enter a password')
    }
  },
}
