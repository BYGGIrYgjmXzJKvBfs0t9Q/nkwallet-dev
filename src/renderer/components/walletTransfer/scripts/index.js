import { mapActions, mapState } from 'vuex'
import { Decimal } from 'decimal.js'
import nkn from 'nkn-sdk'
import receiveWallet from '@/assets/scripts/receiveWallet.json'

export default {
  data () {
    return {
      receiveAddress: receiveWallet.Address,
      receiverBalance: false,
      amount: 0.001,
      fee: 0
    }
  },
  computed: {
    ...mapState(['wallet','balance', 'explorer']),
  },
  methods: {
    ...mapActions(['updateBalance', 'createStatus']),
    async transferFunds () {
      if (!this.wallet.address || !this.balance || !this.receiveAddress) {
        this.createStatus('[ERROR] no wallet loaded')
      } else {
        try {
          const transferRes = await this.wallet.transferTo(this.receiveAddress, this.amount, {fee: this.fee})
          console.log('transfer resolve:', transferRes)
          this.createStatus(`<SUCCESS> transfer ID: ${transferRes}`)
          this.updateBalance()
          this.getReceiverBalance()
        } catch (e) {
          this.createStatus(`[ERROR] ${e}`)
        }
      }
    },
    async getReceiverBalance () {
      const updatedBalance = await nkn.Wallet.getBalance(this.receiveAddress)
      const res = new Decimal(updatedBalance).toFixed()
      this.receiverBalance = `${res} NKN`
    }
  },
  mounted () {
    this.getReceiverBalance()
  }
}