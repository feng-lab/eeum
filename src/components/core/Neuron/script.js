import { mapActions, mapState } from 'vuex';
import VtkView from '@/components/core/VtkView';
import { Breakpoints } from '@/constants';
import Analysis from '@/components/core/Analysis';
import ControlsDrawer from '@/components/core/ControlsDrawer';

// ----------------------------------------------------------------------------
// Component API

// ----------------------------------------------------------------------------

export default {
  name: 'Neuron',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  components: {
    ControlsDrawer,
    VtkView,
    Analysis,
  },
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.width < Breakpoints.md;
    },
    gridTemplateRows() {
      return this.visibleCount === 2 && this.$vuetify.breakpoint.xs
        ? '1fr 1fr'
        : '1fr';
    },
    gridTemplateColumns() {
      return this.visibleCount < 2 || this.$vuetify.breakpoint.xs
        ? '1fr'
        : '1fr 1fr';
    },
    controlsDrawer: {
      get() {
        return this.$store.state.controlsDrawer;
      },
      set(v) {
        this.$store.commit('setControlsDrawer', v);
      },
    },
    needSetting: {
      get() {
        return this.$store.state.needSetting;
      },
      set(v) {
        this.$store.commit('setNeedSetting', v);
      },
    },
    ...mapState('views', {
      views: (state) => state.viewOrder,
      backgroundColors: (state) => state.backgroundColors,
      visibleCount(state) {
        // only show 1 view on small screens
        return this.smallScreen ? 1 : state.visibleCount;
      },
    }),
  },
  methods: {
    updateUI() {
      this.controlsDrawer = true;
      this.needSetting = true;
    },
    openSample(urls, names) {
      this.$emit('open-urls', this.name, urls, names);
    },
    getView(viewType) {
      const [type, name] = viewType.split(':');
      return this.$proxyManager
        .getViews()
        .find(
          (v) => v.getProxyName() === type && (!name || v.getName() === name)
        );
    },
    ...mapActions('views', ['updateLayout']),
  },
  mounted() {
    this.$nextTick(() => {
      if (this.views.length === 0) {
        this.updateViews();
      }
    });
  },
  proxyManagerHooks: {
    onProxyCreated({ proxyGroup, proxyName }) {
      // reset cameras when first trivial producer source is added
      if (
        proxyGroup === 'Sources' &&
        proxyName === 'TrivialProducer' &&
        this.$proxyManager
          .getSources()
          .filter((s) => s.getProxyName() === 'TrivialProducer').length === 1
      ) {
        this.$proxyManager.resetCameraInAllViews();
      }
    },
  },
  updated() {
    this.$proxyManager.resizeAllViews();
  },
  beforeRouteEnter(to, from, next) {
    const urls = [`https://fenglab.xyz/static/data/${to.params.name}.glance`];
    const names = [`${to.params.name}.glance`];
    next((vm) => {
      vm.updateUI();
      vm.openSample(urls, names);
    });
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate(to, from, next) {
    this.controlsDrawer = false;
    this.needSetting = false;
    const urls = [`https://fenglab.xyz/static/data/${to.params.name}.glance`];
    const names = [`${to.params.name}.glance`];
    this.updateUI();
    this.openSample(urls, names);
    next();
  },
  beforeRouteLeave(_to, _from, next) {
    this.controlsDrawer = false;
    this.needSetting = false;
    next();
  },
};
