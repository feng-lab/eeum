import {
  VCard,
  VImg,
  VBtn,
  VAvatar,
  VSpacer,
  VCardTitle,
  VCardActions,
} from 'vuetify/lib';

import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'Slices',
  components: {
    VCard,
    VImg,
    VBtn,
    VAvatar,
    VSpacer,
    VCardTitle,
    VCardActions,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      min: 0,
      max: 179,
      slider: 40,
      absolute: true,
      overlay: true,
      items: [
        {
          src: 'https://fenglab.xyz/static/static/slices2/slice_128.png',
          name: '181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN',
          info:
            'Animals were anesthetized and perfused transcardially with 0.1 M phosphate buffered saline (PBS) and 4% paraformaldehyde in 0.1M phosphate buffer (PFA). Brains were post-fixed in 4% PFA overnight and incubated in 20% sucrose in PBS at 4 °C for cryoprotection. Brains were sectioned coronally in 50 µm thickness on a freezing microtome (Fisher Scientific HM450). During the sectioning, the block-faces (  or the cutting planes) of the entire brains were photographed with a CMOS camera (Leica IC90 E) mounted on a stereomicroscope (Leica M60). For immunofluorescence, brain sections with a 100-µm interval were permeabilized in 0.3% Triton X-100 in tris-buffered saline (TBS) and blocked in 3% normal goat serum, 3% bovine serum albumin, and 0.3% Triton X-100 in TBS. The sections were incubated with primary antibodies overnight at 4 ºC (See Table 1 for the details of antibodies used in this study). After washing, sections were incubated with secondary antibodies for 3 h at room temperature and counterstained with DAPI. Sections were mounted with mounting media (Vector Labs, VectaShield). Secondary antibodies (1:000) used were Alexa Fluor 488 goat anti-rabbit IgG (Invitrogen, A11008), Alexa Fluor 488 goat anti-mouse IgG (Invitrogen, A00000), Alexa Fluor 555 goat anti-mouse IgG (Invitrogen, A00000), Alexa Fluor 555 goat anti-rabbit IgG (Invitrogen, A00000), and Alexa Fluor 633 goat anti-guinea pig IgG (Invitrogen, A00000) Widefield images were acquired by an Axioscan Z1. slide scanner (Carl Zeiss Microscopy) equipped with a 10X 0.45 NA Plan-Apochromat air lens. For cell counting analysis, confocal images were obtained at 0.54 μm depth intervals using a LSM 780 confocal microscope (Carl Zeiss Microscopy) equipped with a 40x 1.4 NA Plan Apochromat oil lens.',
        },
        {
          src: 'https://fenglab.xyz/static/static/slices3/slice_56.png',
          name: '20190813_jellybean_FOXP2_SMI32_NeuN',
          info:
            'Animals were anesthetized and perfused transcardially with 0.1 M phosphate buffered saline (PBS) and 4% paraformaldehyde in 0.1M phosphate buffer (PFA). Brains were post-fixed in 4% PFA overnight and incubated in 20% sucrose in PBS at 4 °C for cryoprotection. Brains were sectioned coronally in 50 µm thickness on a freezing microtome (Fisher Scientific HM450). During the sectioning, the block-faces (  or the cutting planes) of the entire brains were photographed with a CMOS camera (Leica IC90 E) mounted on a stereomicroscope (Leica M60). For immunofluorescence, brain sections with a 100-µm interval were permeabilized in 0.3% Triton X-100 in tris-buffered saline (TBS) and blocked in 3% normal goat serum, 3% bovine serum albumin, and 0.3% Triton X-100 in TBS. The sections were incubated with primary antibodies overnight at 4 ºC (See Table 1 for the details of antibodies used in this study). After washing, sections were incubated with secondary antibodies for 3 h at room temperature and counterstained with DAPI. Sections were mounted with mounting media (Vector Labs, VectaShield). Secondary antibodies (1:000) used were Alexa Fluor 488 goat anti-rabbit IgG (Invitrogen, A11008), Alexa Fluor 488 goat anti-mouse IgG (Invitrogen, A00000), Alexa Fluor 555 goat anti-mouse IgG (Invitrogen, A00000), Alexa Fluor 555 goat anti-rabbit IgG (Invitrogen, A00000), and Alexa Fluor 633 goat anti-guinea pig IgG (Invitrogen, A00000) Widefield images were acquired by an Axioscan Z1. slide scanner (Carl Zeiss Microscopy) equipped with a 10X 0.45 NA Plan-Apochromat air lens. For cell counting analysis, confocal images were obtained at 0.54 μm depth intervals using a LSM 780 confocal microscope (Carl Zeiss Microscopy) equipped with a 40x 1.4 NA Plan Apochromat oil lens.',
        },
      ],
      swiperOption: {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
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
