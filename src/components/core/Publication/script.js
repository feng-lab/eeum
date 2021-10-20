import { Breakpoints } from '@/constants';

export default {
  name: 'Publication',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
