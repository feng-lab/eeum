import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import Mousetrap from 'mousetrap';
import { VBottomSheet, VDialog, VCardTitle } from 'vuetify/lib';
import macro from 'vtk.js/Sources/macro';

import AboutBox from 'paraview-glance/src/components/core/AboutBox';
import BrowserIssues from 'paraview-glance/src/components/core/BrowserIssues';
import ControlsDrawer from 'paraview-glance/src/components/core/ControlsDrawer';
import DragAndDrop from 'paraview-glance/src/components/widgets/DragAndDrop';
import ErrorBox from 'paraview-glance/src/components/core/ErrorBox';
import FileLoader from 'paraview-glance/src/components/core/FileLoader';
import EeumDatasets from 'paraview-glance/src/components/core/EeumDatasets';
import Neuron from 'paraview-glance/src/components/core/Neuron';
import Screenshots from 'paraview-glance/src/components/core/Screenshots';
import StateFileGenerator from 'paraview-glance/src/components/core/StateFileGenerator';
import SvgIcon from 'paraview-glance/src/components/widgets/SvgIcon';
import CollapsibleToolbar from 'paraview-glance/src/components/widgets/CollapsibleToolbar';
import CollapsibleToolbarItem from 'paraview-glance/src/components/widgets/CollapsibleToolbar/Item';

import shortcuts from 'paraview-glance/src/shortcuts';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'EeumApp',
  components: {
    AboutBox,
    BrowserIssues,
    CollapsibleToolbar,
    CollapsibleToolbarItem,
    ControlsDrawer,
    DragAndDrop,
    ErrorBox,
    FileLoader,
    EeumDatasets,
    Neuron,
    Screenshots,
    StateFileGenerator,
    SvgIcon,
    VBottomSheet,
    VDialog,
    VCardTitle,
  },
  provide() {
    return {
      $notify: this.notify,
    };
  },
  data() {
    return {
      aboutDialog: false,
      errorDialog: false,
      fileUploadDialog: false,
      autoloadDialog: false,
      autoloadLabel: '',
      internalControlsDrawer: true,
      screenshotsDrawer: false,
      screenshotCount: 0,
      errors: [],
      globalSingleNotification: '',
      notifyPermanent: false,
      menu: [
        { title: 'home', link: '/' },
        { title: 'datasets', link: '/datasets' },
        { title: 'raw data', link: '/slices' },
        { title: 'protocol', link: '/protocol' },
        { title: 'contact', link: '/contact' },
      ],
    };
  },
  computed: {
    isLight: {
      get() {
        return this.$store.state.isLight;
      },
      set(v) {
        this.$store.commit('setLightTheme', v);
        this.$vuetify.theme.dark = !v;
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
    controlsDrawer: {
      get() {
        return this.$store.state.controlsDrawer;
      },
      set(visible) {
        this.$store.commit('setControlsDrawer', visible);
      },
    },
    ...mapState({
      loadingState: 'loadingState',
      visibleCount: (state) => state.views.visibleCount,
      landingVisible: (state) => state.route === 'landing',
      screenshotsDrawerStateless(state) {
        // Keep screenshot drawer open if screenshot was taken from
        // the "Capture Active View" button.
        return this.screenshotsDrawer && !!state.screenshotDialog;
      },
      smallScreen() {
        return this.$vuetify.breakpoint.smAndDown;
      },
      dialogType() {
        return this.smallScreen ? 'v-bottom-sheet' : 'v-dialog';
      },
      iconLogo() {
        return this.smallScreen ? 'atlas-small' : 'atlas';
      },
    }),
    ...mapGetters('files', {
      anyFileLoadingErrors: 'anyErrors',
    }),
  },
  proxyManagerHooks: {
    onProxyModified() {
      if (!this.loadingState) {
        this.$proxyManager.autoAnimateViews();
      }
    },
  },
  created() {
    this.internalControlsDrawer = !this.smallScreen;
  },
  watch: {
    landingVisible(value) {
      // matches the mobile breakpoint for navigation-drawer
      if (!value && this.$vuetify.breakpoint.mdAndUp) {
        this.controlsDrawer = true;
      } else if (value) {
        this.controlsDrawer = false;
      }
    },
  },
  mounted() {
    this.$root.$on('open_girder_panel', () => {
      this.fileUploadDialog = true;
    });
    this.initViews();

    // attach keyboard shortcuts
    shortcuts.forEach(({ key, action }) =>
      Mousetrap.bind(key, (e) => {
        e.preventDefault();
        this.$store.dispatch(action);
      })
    );

    // listen for errors
    window.addEventListener('error', this.recordError);

    // listen for vtkErrorMacro
    macro.setLoggerFunction('error', (...args) => {
      this.recordError(args.join(' '));
      window.console.error(...args);
    });
  },
  beforeDestroy() {
    window.removeEventListener('error', this.recordError);
    shortcuts.forEach(({ key }) => Mousetrap.unbind(key));
  },
  methods: {
    ...mapMutations({
      showApp: 'showApp',
      showLanding: 'showLanding',
      toggleLanding() {
        if (this.landingVisible) {
          this.showApp();
        } else {
          this.showLanding();
        }
      },
    }),
    ...mapActions({
      saveState: 'saveState',
      initViews: 'views/initViews',
      splitView: 'views/splitView',
      singleView: 'views/singleView',
    }),
    ...mapActions('files', [
      'openFiles',
      'openRemoteFiles',
      'load',
      'resetQueue',
    ]),
    showFileUpload() {
      this.fileUploadDialog = true;
    },
    openFileList(fileList) {
      this.fileUploadDialog = true;
      this.$nextTick(() => this.openFiles(Array.from(fileList)));
    },
    autoLoadRemotes(label, urls, names) {
      console.log(urls);
      const remotes = urls.map((url, index) => ({
        name: names[index],
        url,
      }));
      this.autoloadDialog = true;
      this.autoloadLabel = label;
      setTimeout(
        () =>
          this.openRemoteFiles(remotes)
            .then(() => this.load())
            .then(() => {
              if (this.anyFileLoadingErrors) {
                this.$nextTick(() => {
                  this.fileUploadDialog = true;
                });
              } else {
                this.doneLoadingFiles();
              }
            })
            .finally(() => {
              this.resetQueue();
              this.autoloadDialog = false;
            }),
        // hack to allow loading sample dialog to show up
        10
      );
    },
    doneLoadingFiles() {
      this.showApp();
    },
    recordError(error) {
      this.errors.push(error);
    },
    notify(msg, permanent = false) {
      if (this.globalSingleNotification) {
        this.globalSingleNotification = '';
        this.permanent = false;
      }
      this.$nextTick(() => {
        this.globalSingleNotification = msg;
        this.notifyPermanent = permanent;
      });
    },
  },
};
