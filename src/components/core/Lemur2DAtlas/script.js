import { Breakpoints } from '@/constants';
import 'viewerjs/dist/viewer.css';
import { directive as viewer } from 'v-viewer';

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
        toolbar: true,
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
