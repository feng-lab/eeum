import { Breakpoints } from '@/constants';

export default {
  name: 'mGRASPMapping',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
