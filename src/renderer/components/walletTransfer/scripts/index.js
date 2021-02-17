import { mapActions, mapState } from 'vuex'
import { Decimal } from 'decimal.js'
import nkn from 'nkn-sdk'
import receiveWallet from '@/assets/scripts/receiveWallet.json'
import { toDisplay } from '@/assets/scripts/utils.js'

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
    ...mapState(['wallet', 'info']),
    address () {
      return this.info.address || 'n/a'
    },
    balance () {
      return toDisplay(this.info.balance)
    }
  },
  methods: {
    ...mapActions(['createStatus', 'refreshWallet']),
    async transferFunds () {
      if (!this.wallet.address || !this.balance || !this.receiveAddress) {
        this.createStatus('[ERROR] no wallet loaded')
      } else {
        try {
          const transferId = await this.wallet.transferTo(this.receiveAddress, this.amount, {fee: this.fee})
          this.createStatus(`<SUCCESS> https://nscan.io/transactions/${transferId}`)
          let temp = this
          setTimeout(() => {
            temp.refreshWallet()
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