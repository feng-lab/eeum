import { Breakpoints } from '@/constants';

export default {
  name: 'LemurCellAtlas',
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
