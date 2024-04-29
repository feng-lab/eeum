import { directive as viewer } from 'v-viewer';
import { Breakpoints } from '@/constants';
import 'viewerjs/dist/viewer.css';

export default {
  name: 'Lemur2DAtlas',
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
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
