import { Breakpoints } from '@/constants';

export default {
  name: 'mGRASPDetection',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
