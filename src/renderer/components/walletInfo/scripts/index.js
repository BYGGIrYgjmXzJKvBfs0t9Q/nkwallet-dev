import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['wallet', 'status', 'info']),
    address () {
      return this.info.address
    },
    balance () {
      return this.info.balance
    }
  },
}