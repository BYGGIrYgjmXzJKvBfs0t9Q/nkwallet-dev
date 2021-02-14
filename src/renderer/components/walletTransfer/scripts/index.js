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

import { mapActions, mapState } from 'vuex';
import sendWallet from '@/assets/scripts/sendWallet.json'
import receiveWallet from '@/assets/scripts/receiveWallet.json'

export default {
  data () {
    return {
      // password: ''
    }
  },
  computed: {
    ...mapState(['wallet', 'error']),
  },
  methods: {
    ...mapActions(['updateBalance']),
    transferFunds () {
      // ...
      this.updateBalance()
    }
  },
  mounted () {
    console.log('storage', localStorage)
  }
}