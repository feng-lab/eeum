import { Breakpoints } from '@/constants';

export default {
  name: 'Lemur2DAtlas',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
