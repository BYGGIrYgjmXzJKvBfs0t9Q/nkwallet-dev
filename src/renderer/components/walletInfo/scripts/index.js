import { mapState } from 'vuex';
import { toDisplay } from '@/assets/scripts/utils.js'

export default {
  computed: {
    ...mapState(['wallet', 'status', 'info']),
    address () {
      return this.info.address
    },
    balance () {
      return toDisplay(this.info.balance)
    }
  },
}