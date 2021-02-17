import { mapActions } from 'vuex';

export default {
  data () {
    return {
      seed: null,
      password: null
    }
  },
  methods: {
    ...mapActions(['restoreWallet']),
    openFromSeed () {
        this.restoreWallet({ seed: this.seed, password: this.password})
      // const temp = '911d8ba935fc26abb50dc96a6624a8ad32c00378426e78c1bf769504d7764fa5'
      // 64 len hex str
    }
  },
}