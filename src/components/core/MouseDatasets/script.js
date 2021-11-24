import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'MouseDatasets',
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    remove(item) {
      this.selectedMarker.splice(this.selectedMarker.indexOf(item), 1);
      this.selectedMarker = [...this.selectedMarker];
    },
  },
  computed: {
    icon() {
      return 'mdi-checkbox-blank-outline';
    },
  },

  data() {
    return {
      selectedMarker: [],
      markerHeader: [
        { text: 'name', value: 'name' },
        { text: 'info', value: 'info' },
      ],
      markers: [
        {
          name: 'NeuN',
          info: 'Neuron-specific nuclear protein',
        },
        {
          name: 'VGluT1',
          info: 'Vesicular glutamate transporter 1',
        },
        {
          name: 'VGluT2',
          info: 'Vesicular glutamate transporter 2',
        },
        {
          name: 'SMI32',
          info: 'Neurofilament protein',
        },
        {
          name: 'SMI99',
          info: 'Myelin basic protein',
        },
        {
          name: 'PV',
          info: 'Parvalbumin',
        },
        {
          name: 'TH',
          info: 'Tyrosin hydroxylase',
        },
        {
          name: 'FOXP2',
          info: 'Forkhead box protein P2',
        },
        {
          name: 'M2',
          info: 'Muscarinic receptor',
        },
      ],
      items: [
        {
          name: 'Mouse 01',
          infos: [
            'Age : 3 Months',
            'Section interval : 100-µm',
            'Counterstain: DAPI',
            'Pixel size: 0.65µm x 0.65µm',
          ],
          isReady: true,
          numSlices: 180,
          sliceSrc: 'https://eeum-brain.com/static/static/mouse-W3M01/slice',
          startSlice: 54,
          swiperOption: {
            lazy: true,
            direction: 'horizontal',
            centeredSlides: true,
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true,
            scrollbar: {
              el: '.swiper-scrollbar',
            },
            initialSlide: 54,
          },
          empty: '',
          fullResolutionView:
            'neuroglancer/#!https://eeum-brain.com/static/neuroglancer_data/JK979_PV_VGluT2_NeuN/base.json',
          channels: [
            {
              name: 'PV',
              color: '#00A0FF',
            },
            {
              name: 'VGluT2',
              color: '#00FF33',
            },
            {
              name: 'NeuN',
              color: '#FF0000',
            },
          ],
        },
        {
          name: 'Mouse 02',
          infos: [
            'Age : 3 Months',
            'Section interval : 100-µm',
            'Counterstain: DAPI',
            'Pixel size: 0.65µm x 0.65µm',
          ],
          isReady: true,
          numSlices: 168,
          sliceSrc: 'https://eeum-brain.com/static/static/mouse-W3M02/slice',
          startSlice: 41,
          swiperOption: {
            lazy: true,
            direction: 'horizontal',
            centeredSlides: true,
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true,
            scrollbar: {
              el: '.swiper-scrollbar',
            },
            initialSlide: 41,
          },
          empty: '',
          fullResolutionView:
            'neuroglancer/#!https://eeum-brain.com/static/neuroglancer_data/JK980_PV_TH_NeuN/base.json',
          channels: [
            {
              name: 'PV',
              color: '#00A0FF',
            },
            {
              name: 'TH',
              color: '#00FF33',
            },
            {
              name: 'NeuN',
              color: 'red',
            },
          ],
        },
      ],
      // swiperOption: {
      //   direction: 'horizontal',
      //   slidesPerView: 1,
      //   spaceBetween: 30,
      //   mousewheel: true,
      //   pagination: {
      //     el: '.swiper-pagination',
      //     clickable: true,
      //   },
      // },
    };
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
