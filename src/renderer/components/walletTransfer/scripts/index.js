// from:
//
// @/assets/scripts/sendWallet.json
// NKNKST4P3ZQDRh8pSBfXcSBuuYa3BpiaSs4z

// to:
//
// address
// NKNTZHpbc26wuqHqr168mmrnSkKzQKTRAmHr
//
// seed
// d317e188dd3d6ac28a4e3ba73b56c9094d43235d3db6b9b2e945fc4ed45fa89d
//
// password
// pw
//
// amount
// 0.1 NKN
//
// file
// {"Version":2,"MasterKey":"878ab16a6abafbe2122cad3b28c0c0623a06524c29dd32caae8a5d7e991513f7","IV":"27fb4ebbfb875d02d885616bb19c377e","SeedEncrypted":"7b72853da9d20c03612b3adc83c1cc111304771b47a42ac3b62548ff1a3e175d","Address":"NKNUEQsQJbpcLctMdjDinRtVA37GPLrqiRWL","Scrypt":{"Salt":"b06d279103c3b95e","N":32768,"R":8,"P":1}}

// https://docs.nkn.org/nkn-sdk-js/#wallettransferto
//
// Transfer token from this wallet to another wallet address.
//
// transferTo(
//   toAddress: string,
//   amount: (number | string | common.Amount),
//   options: TransactionOptions
// ): Promise<TxnOrHash>
//
// transferTo(toAddress, amount, options)
//   toAddress (string)
//   amount ((number | string | common.Amount))
//   options (TransactionOptions = {})

import { mapActions, mapState } from 'vuex'
import { Decimal } from 'decimal.js'
import nkn from 'nkn-sdk'
import receiveWallet from '@/assets/scripts/receiveWallet.json'

export default {
  data () {
    return {
      receiveAddress: receiveWallet.Address,
      receiverBalance: false,
      amount: 0.1,
      fee: 0
    }
  },
  computed: {
    ...mapState(['wallet','balance']),
    // fee () {
    //   return this.amount * 0.005
    // },
  },
  methods: {
    ...mapActions(['updateBalance', 'createError']),
    async transferFunds () {
      // console.log('transfer funds started')
      if (!this.wallet.address || !this.balance || !this.receiveAddress) {
        this.createError('no wallet loaded')
      } else {
        try {
          await this.wallet.transferTo(this.receiveAddress, this.amount, {fee: this.fee})
          // console.log('transfer funds success, update balance started')
          this.updateBalance()
          this.getReceiverBalance()
        } catch (e) {
          this.createError(e)
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



// reference
/*
    transfer () {
      const self = this

      const wallet = this.activeWallet
      const address = this.address
      const amount = this.amount
      const fee = this.fee

      wallet.transferTo(address, amount, { fee })
        .then(data => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletTransferSuccess',
            color: 'success',
            timeout: true
          })
          self.$emit('toggleTransferConfirmModal', false)
        })
        .catch(error => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: error,
            color: 'error',
            timeout: true
          })
          self.$emit('toggleTransferConfirmModal', false)
        })
    },
*/