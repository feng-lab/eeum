import Vue from 'vue';
import Router from 'vue-router';
import MousemGRASPDatasets from '@/components/core/MousemGRASPDatasets';
import Neuron from '@/components/core/Neuron';
import Home from '@/components/core/Home';
import Protocol from '@/components/core/Protocol';
import Contact from '@/components/core/Contact';
import LemurDatasets from '@/components/core/LemurDatasets';
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
      path: '/protocol',
      name: 'Protocol',
      component: Protocol,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
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
