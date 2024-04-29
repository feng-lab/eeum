import { Breakpoints } from '@/constants';

export default {
  name: 'Lemur2DAtlas',
  data() {
    return {
      options: {
        title: false,
        navbar: false,
        url: 'data-source',
      },
    };
  },
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
