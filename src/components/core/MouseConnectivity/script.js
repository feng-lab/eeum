import { Breakpoints } from '@/constants';

export default {
  name: 'About',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
