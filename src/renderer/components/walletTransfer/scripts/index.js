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
    ...mapActions(['updateBalance', 'createStatus', 'updateWalletInfo']),
    async transferFunds () {
      if (!this.wallet.address || !this.balance || !this.receiveAddress) {
        this.createStatus('[ERROR] no wallet loaded')
      } else {
        try {
          const transferId = await this.wallet.transferTo(this.receiveAddress, this.amount, {fee: this.fee})

          // add nscan url here
          this.createStatus(`<SUCCESS> transfer ID: ${transferId}`)

          let temp = this
          setTimeout(() => {
            temp.updateWalletInfo()
            temp.updateBalance()
            temp.getReceiverBalance()
          }, 60000)
          
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