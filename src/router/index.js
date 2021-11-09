import Vue from 'vue';
import Router from 'vue-router';
import MousemGRASPDatasets from '@/components/core/MousemGRASPDatasets';
import MouseDatasets from '@/components/core/MouseDatasets';
import Neuron from '@/components/core/Neuron';
import Home from '@/components/core/Home';
import LemurDatasets from '@/components/core/LemurDatasets';
import LemurBrainOntology from '@/components/core/LemurBrainOntology';
import Lemur2DAtlas from '@/components/core/Lemur2DAtlas';
import Lemur3DAtlas from '@/components/core/Lemur3DAtlas';
import mGRASPDetection from '@/components/core/mGRASPDetection';
import BrainNomenclature from '@/components/core/BrainNomenclature';
import mGRASPMapping from '@/components/core/mGRASPMapping';
import Publication from '@/components/core/Publication';
import About from '@/components/core/About';
import Gallery from '@/components/core/Gallery';
// import goTo from 'vuetify/lib/services/goto';

Vue.use(Router);

const NotFound = Vue.extend({
  template:
    '<v-container text-xs-center><v-layout align-center><v-flex>Page Not Found</v-flex></v-layout></v-container>',
});

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/mousemgraspdatasets',
      name: 'MousemGRASPDatasets',
      component: MousemGRASPDatasets,
    },
    {
      path: '/neuron/:name',
      name: 'Neuron',
      component: Neuron,
      meta: { requiresCheck: true },
      props: true,
    },
    {
      path: '/mousedatasets',
      name: 'MouseDatasets',
      component: MouseDatasets,
    },
    {
      path: '/lemurdatasets',
      name: 'LemurDatasets',
      component: LemurDatasets,
    },
    {
      path: '/gallery/:name',
      name: 'Gallery',
      component: Gallery,
      meta: { requiresCheck: false },
      props: true,
    },
    {
      path: '/lemurbrainontology',
      name: 'LemurBrainOntology',
      component: LemurBrainOntology,
    },
    {
      path: '/lemur2datlas',
      name: 'Lemur2DAtlas',
      component: Lemur2DAtlas,
    },
    {
      path: '/lemur3datlas',
      name: 'Lemur3DAtlas',
      component: Lemur3DAtlas,
    },
    {
      path: '/mgraspdetection',
      name: 'mGRASPDetection',
      component: mGRASPDetection,
    },
    {
      path: '/brainnomenclature',
      name: 'BrainNomenclature',
      component: BrainNomenclature,
    },
    {
      path: '/mgraspmapping',
      name: 'mGRASPMapping',
      component: mGRASPMapping,
    },
    {
      path: '/publication',
      name: 'Publication',
      component: Publication,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      // This is a hack to use :to tag for absolute paths.
      path: '/http*',
      beforeEnter: (to) => window.open(to.fullPath.substring(1), '_blank'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
    { path: '/notFound', component: NotFound },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   // need history mode to work
  //   let scrollTo = 0;

  //   if (to.hash) {
  //     scrollTo = to.hash;
  //   } else if (savedPosition) {
  //     scrollTo = savedPosition.y;
  //   }
  //   console.log(scrollTo);
  //   return goTo(scrollTo);
  //   // // not working now
  //   // if (to.hash) {
  //   //   return { selector: to.hash };
  //   // }
  //   // if (savedPosition) {
  //   //   console.log(savedPosition);
  //   //   return savedPosition;
  //   // }
  //   // return { x: 0, y: 0 };
  //   // return new Promise((resolve, reject) => {
  //   //   setTimeout(() => {
  //   //     resolve(savedPosition || { x: 0, y: 0 });
  //   //   }, 500);
  //   // });
  // },
});
