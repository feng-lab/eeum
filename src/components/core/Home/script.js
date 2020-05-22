import { Breakpoints } from '@/constants';

export default {
  name: 'Home',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
