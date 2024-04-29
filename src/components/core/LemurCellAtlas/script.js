import { directive as viewer } from 'v-viewer';
import axios from 'axios';
import { Breakpoints } from '@/constants';
import 'viewerjs/dist/viewer.css';
import ElemurChart from '@/components/widgets/ElemurChart';

export default {
  name: 'LemurCellAtlas',
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  components: { ElemurChart },
  data() {
    return {
      options: {
        title: false,
        navbar: false,
        url: 'data-source',
      },
      showType: 1,
      selectList: [
        { text: 'Atlas', value: 'id' },
        { text: 'DAPI density', value: 'DAPI' },
        { text: 'NeuN density', value: 'NeuN' },
        { text: 'PV density', value: 'PV' },
        { text: 'Neuron/Cell Ratio', value: 'NeuronCellRatio' },
        { text: 'PV/Neuron Ratio', value: 'PVNeuronRatio' },
      ],
      selectType: 'DAPI',
      selectImg: 89,
      imgLoading: false,
      eeumRegionDesc: {},
      isLazyLoading: false,
      itemTotalNum: 178,
      itemPerPage: 24,
      itemPage: 1,
      elemurChartRef: null,
      isNetOpen: true,
    };
  },
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
    currentItemTotal() {
      const total = this.itemPage * this.itemPerPage;
      return total >= this.itemTotalNum ? this.itemTotalNum : total;
    },
    noMore() {
      return this.currentItemTotal >= this.itemTotalNum;
    },
  },
  async created() {
    this.eeumRegionDesc = await this.getEeumRegionDesc();
  },
  mounted() {
    this.elemurChartRef = this.$refs.elemurChartRef;
    this.elemurChartRef.addEventListener('scroll', () => {
      const scrollTop = this.elemurChartRef.scrollTop;
      const clientHeight = this.elemurChartRef.clientHeight;
      const scrollHeight = this.elemurChartRef.scrollHeight;
      if (this.showType === 2 && scrollHeight - scrollTop - clientHeight < 150)
        this.loadMore();
    });
  },
  destoryed() {
    // eslint-disable-next-line prettier/prettier
    this.elemurChartRef.removeEventListener('scroll', () => { });
    this.elemurChartRef = null;
  },
  methods: {
    slideChange(timer = 100) {
      this.itemPage = 1;
      this.imgLoading = true;
      setTimeout(() => {
        this.imgLoading = false;
      }, timer);
    },
    typeChange() {
      this.selectImg = 0;
      this.slideChange(2000);
    },
    async getEeumRegionDesc() {
      const res = await axios.get(
        'https://fenglab.xyz/static/lemur/eeum_region_desc.json'
      );
      return res.data;
    },
    loadMore() {
      if (this.isLazyLoading || this.noMore) return;
      this.isLazyLoading = true;
      setTimeout(() => {
        this.itemPage += 1;
        this.isLazyLoading = false;
      }, 2000);
    },
  },
};
