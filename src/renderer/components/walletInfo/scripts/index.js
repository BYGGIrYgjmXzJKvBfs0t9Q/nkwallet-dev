import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['wallet', 'balance', 'error']),
  },
}