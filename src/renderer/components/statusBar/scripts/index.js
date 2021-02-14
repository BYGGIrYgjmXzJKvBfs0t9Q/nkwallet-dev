import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['status'])
  }
}

// todo:
// push updates to a queue, or override last update + reset timeout