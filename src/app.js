/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify/lib';

import GirderProvider from 'paraview-glance/src/girder';
import { merge } from 'lodash';
// import { vuetify as girderVuetify } from '@girder/components/src';
import { vuetifyConfig as girderVuetifyConfig } from '@girder/components/src/utils';

import '@kitware/vtk.js/Rendering/Profiles/All';

import vtkURLExtract from '@kitware/vtk.js/Common/Core/URLExtract';
import vtkProxyManager from '@kitware/vtk.js/Proxy/Core/ProxyManager';

import 'typeface-roboto/index.css';
import '@mdi/font/css/materialdesignicons.css';
import 'paraview-glance/static/global.css';

// side-effect: register readers
import 'paraview-glance/src/io/ParaViewGlanceReaders';
// side-effect: register presets
import 'paraview-glance/src/config/ColorMaps';

import ReaderFactory from 'paraview-glance/src/io/ReaderFactory';
import EeumApp from 'paraview-glance/src/components/core/EeumApp';
import Config from 'paraview-glance/src/config';
import createStore from 'paraview-glance/src/store';
import { ProxyManagerVuePlugin } from 'paraview-glance/src/plugins';
import Settings from 'paraview-glance/src/settings';

import router from './router';

// Expose IO API to Glance global object
export const {
  getReader,
  importBase64Dataset,
  listReaders,
  listSupportedExtensions,
  loadFiles,
  openFiles,
  registerReader,
  registerReadersToProxyManager,
} = ReaderFactory;

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(ProxyManagerVuePlugin);

let activeProxyConfig = null;
/**
 * Sets the active proxy configuration to be used by createViewer.
 *
 * Once createViewer() is called, setActiveProxyConfiguration will do nothing.
 * Proxy config precedence (decreasing order):
 *   createViewer param, active proxy config, Generic config
 */
export function setActiveProxyConfiguration(config) {
  activeProxyConfig = config;
}

export function createViewer(container, proxyConfig = null) {
  const proxyConfiguration = proxyConfig || activeProxyConfig || Config.Proxy;
  const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration });
  const settings = new Settings();

  const store = createStore({
    proxyManager,
    girder: GirderProvider,
  });

  store.dispatch('retrieveDatasets');

  router.beforeEach((to, from, next) => {
    console.log(to);
    if (!to.matched.length) {
      // console.log('here');
      next('/notFound');
    } else if (
      to.matched.some((record) => record.meta.requiresCheck) &&
      store.state.datasets.length > 0
    ) {
      const name = to.params.name;
      const matched = store.state.datasets.filter((obj) =>
        obj.cellName.includes(name)
      );
      if (matched.length > 0) {
        next();
      } else {
        // console.log('here2');
        next('/notFound');
      }
    } else {
      next();
    }
  });

  const appVuetifyConfig = merge(girderVuetifyConfig, {
    theme: {
      dark: true,
    },
  });

  /* eslint-disable no-new */
  const app = new Vue({
    el: container,
    components: { EeumApp },
    store,
    provide: GirderProvider,
    // if in the future we want to configure vuetify ourselves, see
    // https://github.com/girder/girder_web_components/blob/master/README.md
    vuetify: new Vuetify(appVuetifyConfig),
    proxyManager,
    router,
    template: '<EeumApp />',
  });

  // // support history-based navigation
  // function onRoute(event) {
  //   const state = event.state || {};
  //   if (state.app) {
  //     store.commit('showApp');
  //   } else {
  //     store.commit('showLanding');
  //   }
  // }
  // store.watch(
  //   (state) => state.route,
  //   (route) => {
  //     const state = window.history.state || {};
  //     if (route === 'landing' && state.app) {
  //       window.history.back();
  //     }
  //     if (route === 'app' && !state.app) {
  //       window.history.pushState({ app: true }, '');
  //     }
  //   }
  // );
  // window.history.replaceState({ app: false }, '');
  // window.addEventListener('popstate', onRoute);

  // always enable history setting. Users must explicitly disable it.
  settings.set('noHistory', false);

  settings.syncWithStore(store, {
    collapseDatasetPanels: {
      set: (val) => store.dispatch('collapseDatasetPanels', val),
      get: (state) => state.collapseDatasetPanels,
    },
    suppressBrowserWarning: {
      set: (val) => store.dispatch('suppressBrowserWarning', val),
      get: (state) => state.suppressBrowserWarning,
    },
  });

  return {
    proxyManager,
    store,

    processURLArgs() {
      const params = vtkURLExtract.extractURLParameters();

      Object.keys(params)
        .filter((key) => key.startsWith('setting.'))
        .forEach((key) => {
          const name = key.substr('setting.'.length);
          settings.set(name, params[key]);
        });

      const { name, url } = params;
      if (name && url) {
        const names = typeof name === 'string' ? [name] : name;
        const urls = typeof url === 'string' ? [url] : url;
        app.$children[0].autoLoadRemotes('resources from url', urls, names);
      }
    },
    // All components must have a unique name
    addDatasetPanel(component) {
      store.commit('addPanel', { component });
    },
    showApp() {
      store.commit('showApp');
    },
    getSetting(name) {
      return settings.get(name);
    },
    setSetting(name, value) {
      return settings.set(name, value);
    },
  };
}
