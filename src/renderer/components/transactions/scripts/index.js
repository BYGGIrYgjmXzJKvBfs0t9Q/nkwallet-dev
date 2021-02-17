import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState(['wallet', 'info']),
    history () {
      return this.info.transactions ? this.info.transactions.history : []
    }
  },
}
