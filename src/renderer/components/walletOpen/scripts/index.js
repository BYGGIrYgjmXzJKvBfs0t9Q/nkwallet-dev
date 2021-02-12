import { mapState, mapActions } from 'vuex';
import { savedWallet, savedPassword } from '@/assets/scripts/savedWallet.js';

export default {
  computed: {
    ...mapState(['wallet', 'balance', 'error']),
  },
  methods: {
    ...mapActions(['openWallet']),
    openFromFile () {
      // console.log(this.openWallet)
      this.openWallet({ wallet: savedWallet, password: savedPassword})
    },
  }
}