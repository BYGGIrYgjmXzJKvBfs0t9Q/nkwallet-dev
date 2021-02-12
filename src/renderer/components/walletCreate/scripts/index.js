import {mapActions} from 'vuex';

export default {
  data () {
    return {
      displayName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['createWallet']),
  },
}
