import { mapActions } from 'vuex';
import savedWallet from '@/assets/scripts/savedWallet.json'

export default {
  data () {
    return {
      password: ''
    }
  },
  methods: {
    ...mapActions(['openWallet']),
    openFromFile () {
      this.openWallet({ wallet: savedWallet, password: this.password})
    },
  },
  mounted () {
    console.log('storage', localStorage)
  }
}