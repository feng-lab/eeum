import { Breakpoints } from '@/constants';

export default {
  name: 'Contact',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
