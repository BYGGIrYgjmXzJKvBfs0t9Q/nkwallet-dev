import { mapState, mapActions } from 'vuex';
import { savedWallet } from '@/assets/scripts/savedWallet.js';

export default {
  data () {
    return {
      password: ''
    }
  },
  computed: {
    ...mapState(['wallet', 'balance', 'error']),
  },
  methods: {
    ...mapActions(['openWallet']),
    openFromFile () {
      // console.log(this.openWallet)
      this.openWallet({ wallet: savedWallet, password: this.password})
    },
  }
}