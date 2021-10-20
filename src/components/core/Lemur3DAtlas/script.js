import { Breakpoints } from '@/constants';

export default {
  name: 'Lemur3DAtlas',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
