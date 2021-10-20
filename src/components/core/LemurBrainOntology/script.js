import {
  breadcrumbTrail,
  highlightOnHover,
  nodeInfoDisplayer,
  popUpOnHover,
  sunburst,
  zoomOnClick,
  colorSchemes,
} from 'vue-d3-sunburst';
import 'vue-d3-sunburst/dist/vue-d3-sunburst.css';
import { scaleOrdinal } from 'd3-scale';

const colorSchemesNames = Object.keys(colorSchemes).map((key) => ({
  value: key,
  text: colorSchemes[key].name,
}));

export default {
  name: 'LemurBrainOntology',
  components: {
    sunburst,
    nodeInfoDisplayer,
    breadcrumbTrail,
    highlightOnHover,
    zoomOnClick,
    popUpOnHover,
  },
  data() {
    return {
      tree: {
        name: 'root',
        children: [
          {
            name: 'Basic cell groups and regions',
            children: [
              {
                name: 'Cerebrum',
                children: [
                  {
                    name: 'Cerebral cortex',
                    children: [
                      {
                        name: 'Isocortex',
                        size: 226364520,
                      },
                      {
                        name: 'Remaining region',
                        size: 28221982,
                      },
                    ],
                  },
                  {
                    name: 'Hippocampal formation',
                    size: 47944705,
                  },
                  {
                    name: 'Cerebral nuclei',
                    children: [
                      {
                        name: 'Striatum',
                        size: 36610559,
                      },
                      {
                        name: 'Pallidum',
                        size: 10201870,
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Brain stem',
                children: [
                  {
                    name: 'Interbrain',
                    children: [
                      {
                        name: 'Thalamus',
                        size: 28885093,
                      },
                      {
                        name: 'Hypothalamus',
                        size: 10415044,
                      },
                    ],
                  },
                  {
                    name: 'Midbrain',
                    size: 35585278,
                  },
                  {
                    name: 'Hindbrain',
                    children: [
                      {
                        name: 'Pons',
                        size: 11466405,
                      },
                      {
                        name: 'Medulla',
                        size: 28672448,
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Cerebellum',
                size: 64319042,
              },
            ],
          },
          {
            name: 'fiber tracts',
            size: 52953042,
          },
          {
            name: 'ventricular systems',
            size: 4974184,
          },
        ],
      },
      minAngleDisplayed: 0.01,
      colorScheme: colorSchemesNames[0].value,
      colorSchemes: colorSchemesNames,
      inAnimationDuration: 100,
      outAnimationDuration: 1000,
      overrideColorScale: false,
      centralCircleRelativeSize: 25,
      showLabels: true,
      showLabelsOptions: [
        { text: 'false', value: false },
        { text: 'true', value: true },
        { text: 'custom', value: this.showLabelsFunction },
      ],
      custoColorScale: scaleOrdinal([
        '#e39b89',
        '#31ea74',
        '#3c7227',
        '#9dad1f',
      ]),
    };
  },
  computed: {
    colorScale() {
      return this.overrideColorScale ? this.custoColorScale : null;
    },
  },
  methods: {
    showLabelsFunction(d) {
      const {
        data1,
        context: { angle, relativeDepth },
      } = d;
      if (relativeDepth > 2 || angle < 5) {
        return null;
      }
      return data1.name;
    },
  },
};
