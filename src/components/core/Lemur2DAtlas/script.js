import { directive as viewer } from 'v-viewer';
import { Breakpoints } from '@/constants';
import 'viewerjs/dist/viewer.css';
import ElemurChart from '@/components/widgets/ElemurChart';

export default {
  name: 'Lemur2DAtlas',
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  components: { ElemurChart },
  data () {
    return {
      options: {
        title: false,
        navbar: false,
        url: 'data-source',
      },
      showType: 1,
      selectList: [
        { text: 'Atlas', value: 'id' },
        { text: 'DAPI density atlas', value: 'DAPI' },
        { text: 'NeuN density atlas', value: 'NeuN' },
        { text: 'PV density atlas', value: 'PV' },
        { text: 'NeuN/Cell atlas', value: 'NeuronCellRatio' },
        { text: 'PV/Neuron atlas', value: 'PVNeuronRatio' },
      ],
      selectType: 'id',
      model: 0,
      imgLoading: false,
    };
  },
  computed: {
    smallScreen () {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
  },
  methods: {
    slideChange () {
      this.imgLoading = true;
      setTimeout(() => {
        this.imgLoading = false;
      }, 0);
    },
    typeChange () {
      this.model = 0;
      this.slideChange();
    },
  },
};
