import { mapActions } from 'vuex';
import sendWallet from '@/assets/scripts/sendWallet.json'

export default {
  data () {
    return {
      password: ''
    }
  },
  methods: {
    ...mapActions(['openWallet']),
    openFromFile () {
      this.openWallet({ wallet: sendWallet, password: this.password})
    }
    // this.openFromSeed() {}
  },
  mounted () {
    console.log('storage', localStorage)
  }
}