import { Breakpoints } from '@/constants';

export default {
  name: 'Protocol',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
