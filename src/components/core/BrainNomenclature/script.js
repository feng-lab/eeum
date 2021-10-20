import { Breakpoints } from '@/constants';

export default {
  name: 'BrainNomenclature',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
