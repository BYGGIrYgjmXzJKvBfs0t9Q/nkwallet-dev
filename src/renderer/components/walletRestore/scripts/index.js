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
    }
  },
}