export default {
  name: 'Analysis',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      analyses: {
        name: '',
        summary: {},
        analyses: [],
      },
      panelOpen: [0, 1, 2, 3, 4, 5, 6, 7],
      rowsPerPageItems: [
        10,
        20,
        30,
        50,
        100,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 },
      ],
      pagination: { rowsPerPage: -1 },
      headers2: [
        { text: 'Key', align: 'left', value: 'key' },
        { text: 'Value', align: 'left', value: 'value' },
      ],
    };
  },
  computed: {},
  methods: {
    moveAnchor(id) {
      const div = document.getElementById(id).scrollIntoView(); // eslint-disable-line no-unused-vars
    },
    checkCell() {
      const flag = this.cellName;
      const check = flag.indexOf('PCs') !== -1;
      return check;
    },
  },
  created() {
    let i;
    for (i = 0; i < this.$store.state.datasets.length; i++) {
      if (this.$store.state.datasets[i].cellName === this.name) {
        this.analyses = this.$store.state.datasets[i].analysis;
        this.analyses.summary[
          'coordinate (AP, ML, DV)'
        ] = this.$store.state.datasets[i].coordinate;
        this.analyses.summary.strain = this.$store.state.datasets[i].strain;
        this.analyses.summary.age = this.$store.state.datasets[i].age;
        this.analyses.summary.sex = this.$store.state.datasets[i].sex;
        break;
      }
    }
    console.log(this.analyses);
  },
};
