// import L from 'leaflet';
// import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
// import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import 'leaflet/dist/leaflet.css';
// import 'swiper/dist/css/swiper.css';
import { VCard, VImg } from 'vuetify/lib';

export default {
  name: 'Slices',
  components: {
    VCard,
    VImg,
  },
  // components: {
  //   LMap,
  //   LTileLayer,
  //   LMarker,
  //   swiper,
  //   swiperSlide,
  // },
  data() {
    return {
      min: 0,
      max: 179,
      slider: 40,

      // crs: L.CRS.Simple,
      // center: L.latLng(-80, 120),
      // initialZoom: 2,
      // minZoom: 0,
      // maxZoom: 7,
      // bounds: [],
      // options: {
      //   zoomControl: 'topleft',
      //   crs: L.CRS.Simple,
      //   minZoom: 0,
      //   maxZoom: 7,
      // },
      // opts: {
      //   showLabel: true,
      //   label: {
      //     scale: 1,
      //     unit: 'µm',
      //     color: '#F6BB43',
      //     size: 15,
      //   },
      // },
      // swiperOptionThumbs: {
      //   spaceBetween: 10,
      //   centeredSlides: true,
      //   slidesPerView: 3,
      //   touchRatio: 0.2,
      //   slideToClickedSlide: true,
      // },
      select: '181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN',
      items: ['181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN'],
    };
  },

  computed: {
    imageUrl() {
      return `https://fenglab.xyz/static/example_slice_leaflet/z_${this.slider}/{z}/{x}/{y}.png`;
    },
    swiper() {
      return this.$refs.swiperThumbs.swiper;
    },
    thumbUrls() {
      const arr = [];
      for (let i = 0; i < this.max; i++) {
        const obj = {};
        obj.index = i;
        obj.link = `https://fenglab.xyz/static/example_slice_leaflet/z_${i}/0/0/0.png`;
        arr.push(obj);
      }
      console.log(arr);
      return arr;
    },
    mapStyle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'height: 400px; background: black;';
        case 'sm':
          return 'height: 400px; background: black;';
        case 'md':
          return 'height: 540px; background: black;';
        case 'lg':
          return 'height: 800px; background: black;';
        case 'xl':
          return 'height: 1080px; background: black;';
        default:
          return 'height: 600px; background: black;';
      }
    },
  },

  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.mymap = this.$refs.mymap.mapObject;
  //     // console.log('this is current swiper instance object', this.swiper);
  //     // this.swiper.slideTo(this.slider, 1000, false);
  //   });
  // },
};
