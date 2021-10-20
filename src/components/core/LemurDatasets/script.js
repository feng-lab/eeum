import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'LemurDatasets',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
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
          src: 'https://fenglab.xyz/static/static/slices2/slice_128.png',
          name: 'Reference brain',
          infos: [
            'Section interval : 100-µm',
            'Counterstain: DAPI',
            'Pixel size: 0.65µm x 0.65µm',
            'Widefield image available',
          ],
          numSlices: 180,
          sliceSrc: 'https://fenglab.xyz/static/static/slices2/slice_',
          startSlice: 128,
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
            initialSlide: 90,
          },
          sliceLinkPre:
            'http://localhost:8080/#!%7B%22dimensions%22:%7B%22x%22:%5B0.000010444176%2C%22m%22%5D%2C%22y%22:%5B0.000010444176%2C%22m%22%5D%2C%22z%22:%5B0.0001%2C%22m%22%5D%7D%2C%22position%22:%5B1759.8031005859375%2C616.8143310546875%2C',
          sliceLinkPost:
            '%5D%2C%22crossSectionScale%22:1.8719968561115337%2C%22projectionOrientation%22:%5B-0.11555982381105423%2C-0.09716008603572845%2C0.4296676218509674%2C0.8902761340141296%5D%2C%22projectionScale%22:50764.49878262887%2C%22layers%22:%5B%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN/Brightfield%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22name%22:%22Brightfield%22%2C%22visible%22:false%7D%2C%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN/DAPI%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22shaderControls%22:%7B%22normalized%22:%7B%22range%22:%5B0%2C17053%5D%7D%2C%22color%22:%22#00a0ff%22%7D%2C%22name%22:%22DAPI%22%7D%2C%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN/SMI99%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22shaderControls%22:%7B%22normalized%22:%7B%22range%22:%5B0%2C13386%5D%7D%2C%22color%22:%22#00ff33%22%7D%2C%22name%22:%22SMI99%22%7D%2C%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN/VGluT2%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22shaderControls%22:%7B%22normalized%22:%7B%22range%22:%5B0%2C9536%5D%7D%2C%22color%22:%22#ff0000%22%7D%2C%22name%22:%22VGluT2%22%7D%2C%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN/NeuN%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22shaderControls%22:%7B%22normalized%22:%7B%22range%22:%5B0%2C15169%5D%7D%2C%22color%22:%22#0000ff%22%7D%2C%22name%22:%22NeuN%22%7D%2C%7B%22type%22:%22segmentation%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN/bigregion_annotation%22%2C%22tab%22:%22segments%22%2C%22segmentColors%22:%7B%22221%22:%22#f8e142%22%2C%22222%22:%22#f8e142%22%2C%22223%22:%22#f8e142%22%2C%22224%22:%22#f8e142%22%2C%22225%22:%22#f8e142%22%2C%22313%22:%22#af04fa%22%2C%22315%22:%22#facd04%22%2C%22354%22:%22#fa0465%22%2C%22391%22:%22#f9b916%22%2C%22392%22:%22#f9b916%22%2C%22393%22:%22#f9b916%22%2C%22394%22:%22#f9b916%22%2C%22395%22:%22#f9b916%22%2C%22477%22:%22#04b7fa%22%2C%22481%22:%22#fabe12%22%2C%22482%22:%22#fabe12%22%2C%22483%22:%22#fabe12%22%2C%22484%22:%22#fabe12%22%2C%22485%22:%22#fabe12%22%2C%22512%22:%22#fa0422%22%2C%22549%22:%22#5a04fa%22%2C%22771%22:%22#fa04af%22%2C%22803%22:%22#0440fa%22%2C%22951%22:%22#f9dc33%22%2C%22952%22:%22#f9dc33%22%2C%22953%22:%22#f9dc33%22%2C%22954%22:%22#f9dc33%22%2C%22955%22:%22#f9dc33%22%2C%22961%22:%22#fac30d%22%2C%22962%22:%22#fac30d%22%2C%22963%22:%22#fac30d%22%2C%22964%22:%22#fac30d%22%2C%22965%22:%22#fac30d%22%2C%221009%22:%22#a9b00a%22%2C%221097%22:%22#e64438%22%2C%221841%22:%22#f9df3b%22%2C%221842%22:%22#f9df3b%22%2C%221843%22:%22#f9df3b%22%2C%221844%22:%22#f9df3b%22%2C%221845%22:%22#f9df3b%22%2C%221929%22:%22#fa8ff3%22%2C%221939%22:%22#effb72%22%2C%221949%22:%22#fba672%22%2C%221959%22:%22#95fb72%22%2C%221969%22:%22#fb72a2%22%2C%221979%22:%22#5358fc%22%2C%222541%22:%22#f8a427%22%2C%222542%22:%22#f8a427%22%2C%222543%22:%22#f8a427%22%2C%222544%22:%22#f8a427%22%2C%222545%22:%22#f8a427%22%2C%223111%22:%22#a35006%22%2C%223221%22:%22#f6f47f%22%2C%223222%22:%22#f6f47f%22%2C%223223%22:%22#f6f47f%22%2C%223224%22:%22#f6f47f%22%2C%223225%22:%22#f6f47f%22%2C%223781%22:%22#f7eb61%22%2C%223782%22:%22#f7eb61%22%2C%223783%22:%22#f7eb61%22%2C%223784%22:%22#f7eb61%22%2C%223785%22:%22#f7eb61%22%2C%223851%22:%22#f9d723%22%2C%223852%22:%22#f9d723%22%2C%223853%22:%22#f9d723%22%2C%223854%22:%22#f9d723%22%2C%223855%22:%22#f9d723%22%2C%224773%22:%22#040658%22%2C%224774%22:%22#3f41b4%22%2C%224775%22:%22#0f7e32%22%2C%224776%22:%22#f0fa75%22%2C%224777%22:%22#acb906%22%2C%224778%22:%22#06985a%22%2C%224779%22:%22#088f93%22%2C%226691%22:%22#fad418%22%2C%226692%22:%22#fad418%22%2C%226693%22:%22#fad418%22%2C%226694%22:%22#fad418%22%2C%226695%22:%22#fad418%22%2C%228361%22:%22#fad214%22%2C%228362%22:%22#fad214%22%2C%228363%22:%22#fad214%22%2C%228364%22:%22#fad214%22%2C%228365%22:%22#fad214%22%2C%228941%22:%22#f9aa23%22%2C%228942%22:%22#f9aa23%22%2C%228943%22:%22#f9aa23%22%2C%228944%22:%22#f9aa23%22%2C%228945%22:%22#f9aa23%22%2C%228951%22:%22#fac809%22%2C%228952%22:%22#fac809%22%2C%228953%22:%22#fac809%22%2C%228954%22:%22#fac809%22%2C%228955%22:%22#fac809%22%2C%229091%22:%22#f9ad21%22%2C%229092%22:%22#f9ad21%22%2C%229093%22:%22#f9ad21%22%2C%229094%22:%22#f9ad21%22%2C%229095%22:%22#f9ad21%22%2C%229101%22:%22#046f12%22%2C%229102%22:%22#97fee8%22%2C%229103%22:%22#fd79ab%22%2C%229721%22:%22#f9b41b%22%2C%229722%22:%22#f9b41b%22%2C%229723%22:%22#f9b41b%22%2C%229724%22:%22#f9b41b%22%2C%229725%22:%22#f9b41b%22%2C%229851%22:%22#f7f070%22%2C%229852%22:%22#f7f070%22%2C%229853%22:%22#f7f070%22%2C%229854%22:%22#f7f070%22%2C%229855%22:%22#f7f070%22%2C%229931%22:%22#f8e652%22%2C%229932%22:%22#f8e652%22%2C%229933%22:%22#f8e652%22%2C%229934%22:%22#f8e652%22%2C%229935%22:%22#f8e652%22%2C%2210841%22:%22#f9af1f%22%2C%2210842%22:%22#f9af1f%22%2C%2210843%22:%22#f9af1f%22%2C%2210844%22:%22#f9af1f%22%2C%2210845%22:%22#f9af1f%22%7D%2C%22name%22:%22bigregion_annotation%22%7D%5D%2C%22selectedLayer%22:%7B%22layer%22:%22NeuN%22%2C%22visible%22:true%7D%2C%22layout%22:%22xy%22%7D',
          empty: '',
          fullResolutionView:
            'http://localhost:8080/#!https://fenglab.xyz/static/neuroglancer_data/181005_Lemur-Hotsauce_SMI99_VGluT2_NeuN/base.json',
          channels: [
            {
              name: 'DAPI',
              color: '#00A0FF',
            },
            {
              name: 'SMI99',
              color: '#00FF33',
            },
            {
              name: 'VGluT2',
              color: '#FF0000',
            },
            {
              name: 'NeuN',
              color: 'magenta',
            },
          ],
        },
        {
          src: 'https://fenglab.xyz/static/static/slices3/slice_56.png',
          name: 'eLemur brain01',
          infos: [
            'Section interval : 100-µm',
            'Counterstain: DAPI',
            'Pixel size: 0.65µm x 0.65µm',
            'Widefield image available',
          ],
          numSlices: 180,
          sliceSrc: 'https://fenglab.xyz/static/static/slices3/slice_',
          startSlice: 56,
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
            initialSlide: 90,
          },
          sliceLinkPre:
            'http://localhost:8080/#!%7B%22dimensions%22:%7B%22x%22:%5B0.000010444176%2C%22m%22%5D%2C%22y%22:%5B0.000010444176%2C%22m%22%5D%2C%22z%22:%5B0.0001%2C%22m%22%5D%7D%2C%22position%22:%5B1759.8031005859375%2C616.8143310546875%2C',
          sliceLinkPost:
            '%5D%2C%22crossSectionScale%22:1.8719968561115337%2C%22projectionOrientation%22:%5B-0.11555982381105423%2C-0.09716008603572845%2C0.4296676218509674%2C0.8902761340141296%5D%2C%22projectionScale%22:50764.49878262887%2C%22layers%22:%5B%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/20190813_jellybean_FOXP2_SMI32_NeuN/Brightfield%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22name%22:%22Brightfield%22%2C%22visible%22:false%7D%2C%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/20190813_jellybean_FOXP2_SMI32_NeuN/DAPI%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22shaderControls%22:%7B%22normalized%22:%7B%22range%22:%5B0%2C17053%5D%7D%2C%22color%22:%22#00a0ff%22%7D%2C%22name%22:%22DAPI%22%7D%2C%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/20190813_jellybean_FOXP2_SMI32_NeuN/SMI99%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22shaderControls%22:%7B%22normalized%22:%7B%22range%22:%5B0%2C13386%5D%7D%2C%22color%22:%22#00ff33%22%7D%2C%22name%22:%22SMI99%22%7D%2C%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/20190813_jellybean_FOXP2_SMI32_NeuN/VGluT2%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22shaderControls%22:%7B%22normalized%22:%7B%22range%22:%5B0%2C9536%5D%7D%2C%22color%22:%22#ff0000%22%7D%2C%22name%22:%22VGluT2%22%7D%2C%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/20190813_jellybean_FOXP2_SMI32_NeuN/NeuN%22%2C%22opacity%22:1%2C%22blend%22:%22additive%22%2C%22shaderControls%22:%7B%22normalized%22:%7B%22range%22:%5B0%2C15169%5D%7D%2C%22color%22:%22#0000ff%22%7D%2C%22name%22:%22NeuN%22%7D%2C%7B%22type%22:%22segmentation%22%2C%22source%22:%22precomputed://https://fenglab.xyz/static/neuroglancer_data/20190813_jellybean_FOXP2_SMI32_NeuN/bigregion_annotation%22%2C%22tab%22:%22segments%22%2C%22segmentColors%22:%7B%22221%22:%22#f8e142%22%2C%22222%22:%22#f8e142%22%2C%22223%22:%22#f8e142%22%2C%22224%22:%22#f8e142%22%2C%22225%22:%22#f8e142%22%2C%22313%22:%22#af04fa%22%2C%22315%22:%22#facd04%22%2C%22354%22:%22#fa0465%22%2C%22391%22:%22#f9b916%22%2C%22392%22:%22#f9b916%22%2C%22393%22:%22#f9b916%22%2C%22394%22:%22#f9b916%22%2C%22395%22:%22#f9b916%22%2C%22477%22:%22#04b7fa%22%2C%22481%22:%22#fabe12%22%2C%22482%22:%22#fabe12%22%2C%22483%22:%22#fabe12%22%2C%22484%22:%22#fabe12%22%2C%22485%22:%22#fabe12%22%2C%22512%22:%22#fa0422%22%2C%22549%22:%22#5a04fa%22%2C%22771%22:%22#fa04af%22%2C%22803%22:%22#0440fa%22%2C%22951%22:%22#f9dc33%22%2C%22952%22:%22#f9dc33%22%2C%22953%22:%22#f9dc33%22%2C%22954%22:%22#f9dc33%22%2C%22955%22:%22#f9dc33%22%2C%22961%22:%22#fac30d%22%2C%22962%22:%22#fac30d%22%2C%22963%22:%22#fac30d%22%2C%22964%22:%22#fac30d%22%2C%22965%22:%22#fac30d%22%2C%221009%22:%22#a9b00a%22%2C%221097%22:%22#e64438%22%2C%221841%22:%22#f9df3b%22%2C%221842%22:%22#f9df3b%22%2C%221843%22:%22#f9df3b%22%2C%221844%22:%22#f9df3b%22%2C%221845%22:%22#f9df3b%22%2C%221929%22:%22#fa8ff3%22%2C%221939%22:%22#effb72%22%2C%221949%22:%22#fba672%22%2C%221959%22:%22#95fb72%22%2C%221969%22:%22#fb72a2%22%2C%221979%22:%22#5358fc%22%2C%222541%22:%22#f8a427%22%2C%222542%22:%22#f8a427%22%2C%222543%22:%22#f8a427%22%2C%222544%22:%22#f8a427%22%2C%222545%22:%22#f8a427%22%2C%223111%22:%22#a35006%22%2C%223221%22:%22#f6f47f%22%2C%223222%22:%22#f6f47f%22%2C%223223%22:%22#f6f47f%22%2C%223224%22:%22#f6f47f%22%2C%223225%22:%22#f6f47f%22%2C%223781%22:%22#f7eb61%22%2C%223782%22:%22#f7eb61%22%2C%223783%22:%22#f7eb61%22%2C%223784%22:%22#f7eb61%22%2C%223785%22:%22#f7eb61%22%2C%223851%22:%22#f9d723%22%2C%223852%22:%22#f9d723%22%2C%223853%22:%22#f9d723%22%2C%223854%22:%22#f9d723%22%2C%223855%22:%22#f9d723%22%2C%224773%22:%22#040658%22%2C%224774%22:%22#3f41b4%22%2C%224775%22:%22#0f7e32%22%2C%224776%22:%22#f0fa75%22%2C%224777%22:%22#acb906%22%2C%224778%22:%22#06985a%22%2C%224779%22:%22#088f93%22%2C%226691%22:%22#fad418%22%2C%226692%22:%22#fad418%22%2C%226693%22:%22#fad418%22%2C%226694%22:%22#fad418%22%2C%226695%22:%22#fad418%22%2C%228361%22:%22#fad214%22%2C%228362%22:%22#fad214%22%2C%228363%22:%22#fad214%22%2C%228364%22:%22#fad214%22%2C%228365%22:%22#fad214%22%2C%228941%22:%22#f9aa23%22%2C%228942%22:%22#f9aa23%22%2C%228943%22:%22#f9aa23%22%2C%228944%22:%22#f9aa23%22%2C%228945%22:%22#f9aa23%22%2C%228951%22:%22#fac809%22%2C%228952%22:%22#fac809%22%2C%228953%22:%22#fac809%22%2C%228954%22:%22#fac809%22%2C%228955%22:%22#fac809%22%2C%229091%22:%22#f9ad21%22%2C%229092%22:%22#f9ad21%22%2C%229093%22:%22#f9ad21%22%2C%229094%22:%22#f9ad21%22%2C%229095%22:%22#f9ad21%22%2C%229101%22:%22#046f12%22%2C%229102%22:%22#97fee8%22%2C%229103%22:%22#fd79ab%22%2C%229721%22:%22#f9b41b%22%2C%229722%22:%22#f9b41b%22%2C%229723%22:%22#f9b41b%22%2C%229724%22:%22#f9b41b%22%2C%229725%22:%22#f9b41b%22%2C%229851%22:%22#f7f070%22%2C%229852%22:%22#f7f070%22%2C%229853%22:%22#f7f070%22%2C%229854%22:%22#f7f070%22%2C%229855%22:%22#f7f070%22%2C%229931%22:%22#f8e652%22%2C%229932%22:%22#f8e652%22%2C%229933%22:%22#f8e652%22%2C%229934%22:%22#f8e652%22%2C%229935%22:%22#f8e652%22%2C%2210841%22:%22#f9af1f%22%2C%2210842%22:%22#f9af1f%22%2C%2210843%22:%22#f9af1f%22%2C%2210844%22:%22#f9af1f%22%2C%2210845%22:%22#f9af1f%22%7D%2C%22name%22:%22bigregion_annotation%22%7D%5D%2C%22selectedLayer%22:%7B%22layer%22:%22NeuN%22%2C%22visible%22:true%7D%2C%22layout%22:%22xy%22%7D',
          empty: '',
          fullResolutionView:
            'http://localhost:8080/#!https://fenglab.xyz/static/neuroglancer_data/20190813_jellybean_FOXP2_SMI32_NeuN/base.json',
          channels: [
            {
              name: 'DAPI',
              color: '#00A0FF',
            },
            {
              name: 'SMI99',
              color: '#00FF33',
            },
            {
              name: 'VGluT2',
              color: '#FF0000',
            },
            {
              name: 'NeuN',
              color: 'magenta',
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
