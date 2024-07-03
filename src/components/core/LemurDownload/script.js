import { Breakpoints } from '@/constants';

export default {
  name: 'LemurDownload',
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
};
