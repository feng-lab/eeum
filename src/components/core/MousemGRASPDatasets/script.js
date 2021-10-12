import _ from 'lodash';
import { Breakpoints } from '@/constants';

function objectMatchSearch(obj, search) {
  if (
    Object.keys(obj)
      .filter((key) => obj[key] && typeof obj[key] !== 'object')
      .some((key) => `${key}:${obj[key]}`.toLowerCase().includes(search))
  ) {
    return true;
  }
  return Object.keys(obj)
    .filter((key) => obj[key] && typeof obj[key] === 'object')
    .some((key) => objectMatchSearch(obj[key], search));
}

export default {
  name: 'MousemGRASPDatasets',
  data() {
    return {
      search: '',
      samples: [],
      tabs: null,
      searchEcho: 'Type something to search database',
      version: window.GLANCE_VERSION || 'no version available',
      headers: [
        { text: 'Cell Name', align: 'left', value: 'cellName' },
        { text: 'Animal', align: 'left', value: 'animalId' },
        { text: 'Strain', align: 'left', value: 'strain' },
        { text: 'Sex', align: 'left', value: 'sex' },
        { text: 'Date of Birth', align: 'left', value: 'dob' },
        { text: 'Age', align: 'left', value: 'age' },
        {
          text: 'Coordinate AP, ML, DV (mm)',
          align: 'left',
          value: 'coordinate',
        },
        { text: 'Actions', sortable: false, value: 'action' },
        { text: '', value: 'data-table-expand' },
      ],
      headers2: [
        { text: 'Key', align: 'left', value: 'key' },
        { text: 'Value', align: 'left', value: 'value' },
      ],
      rowsPerPageItems: [
        10,
        20,
        30,
        50,
        100,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 },
      ],
      expanded: [],
      singleExpand: false,
      scrollposition: [],
    };
  },
  watch: {
    // whenever question changes, this function will run
    // eslint-disable-next-line no-unused-vars
    search(_newQuestion, _oldQuestion) {
      this.searchEcho = 'Waiting for you to stop typing...';
      this.debouncedGetAnswer();
    },
    // eslint-disable-next-line no-unused-vars
    allSamples(_newSamples, _oldSamples) {
      this.getAnswer();
    },
  },
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
    allSamples() {
      return this.$store.state.datasets;
    },
  },
  created() {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    // In this case, we want to limit how often we access
    // yesno.wtf/api, waiting until the user has completely
    // finished typing before making the ajax request. To learn
    // more about the _.debounce function (and its cousin
    // _.throttle), visit: https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);

    // console.log(this.allSamples.length);
  },
  mounted() {
    this.$on('download-clicked', (data) => {
      console.log('download: ', data);
    });
    this.$on('bookmark-clicked', (data) => {
      console.log('bookmark: ', data);
    });
    this.$on('share-clicked', (data) => {
      console.log('share: ', data);
    });
  },
  methods: {
    openSample(sample) {
      this.$router.push({ name: 'Neuron', params: { name: sample.cellName } });
    },
    getAnswer() {
      if (this.search.trim().length === 0) {
        this.samples = this.allSamples;
        this.searchEcho = 'Type something to search database';
      } else {
        this.searchEcho = 'Searching...';
        this.samples = this.allSamples.filter((samp) =>
          objectMatchSearch(samp, this.search.toLowerCase())
        );
        this.searchEcho = `Showing datasets that match "${this.search}"`;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getAnswer();
    });
  },
  // activated() {
  //   document.querySelector('.container').scrollTop = this.scrollposition;
  // },
  // beforeRouteLeave(to, from, next) {
  //   this.scrollposition = document.querySelector('.container').scrollTop;
  //   console.log(this.scrollposition);
  //   next();
  // },
};
