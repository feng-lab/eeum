import { Breakpoints } from '@/constants';

export default {
  name: 'STN Connectivity',

  data() {
    return {
      overlay: false,
    };
  },
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
