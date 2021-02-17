import { mapActions, mapState } from 'vuex'
import { Decimal } from 'decimal.js'
import nkn from 'nkn-sdk'
import { toDisplay } from '@/assets/scripts/utils.js'

export default {
  data () {
    return {
      recipient: null,
      amount: null,
      fee: null
    }
  },
  computed: {
    ...mapState(['wallet', 'info']),
    address () {
      return this.info.address || 'n/a'
    },
    displayBalance () {
      return toDisplay(this.info.balance)
    },
    displayRecipient () {
      if (!this.recipient) return 'n/a'
      const valid = nkn.Wallet.verifyAddress(this.recipient)
      return valid ? this.recipient : '(invalid address)'
    },
    displayAmount () {
      if (!this.amount) return 'n/a'
      return this.amount * 100000000 < this.info.balance ? toDisplay(this.amount * 100000000) : '(insufficient funds)'
    },
    displayFee () {
      if (!this.fee) return 'n/a'
      return this.fee * 100000000 <  this.info.balance - (this.amount * 100000000) ? toDisplay(this.fee * 100000000) : '(insufficient funds)'
    }
  },
  methods: {
    ...mapActions(['createStatus', 'refreshWallet']),
    async transferFunds () {
        try {
          const transferId = await this.wallet.transferTo(this.recipient, this.amount, {fee: this.fee})
          console.log(`<SUCCESS> https://nscan.io/transactions/${transferId}`)
          this.createStatus(`<SUCCESS> https://nscan.io/transactions/${transferId}`)
          let temp = this
          setTimeout(() => {
            temp.refreshWallet()
          }, 60000)
          
        } catch (e) {
          this.createStatus(`[ERROR] ${e}`)
        }
    }
  },
}