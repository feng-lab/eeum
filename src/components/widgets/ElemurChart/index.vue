<template>
  <v-col
    :id="`geo-map-${id}`"
    cols="12"
    :sm="full ? 12 : 12"
    :md="full ? 12 : 6"
    :lg="full ? 12 : 3"
    :xl="full ? 12 : 2"
    class="pa-4"
    :class="full ? 'geo-full-map-wrap' : 'geo-map-wrap'"
  ></v-col>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';
// import { eeum_region_desc } from '../../../locals/eeum_region_desc.js';

export default {
  props: {
    id: {
      type: Number,
      default: 2,
    },
    mtype: {
      type: String,
      default: 'id',
    },
    full: {
      type: Boolean,
      default: true,
    },
    eeumRegionDesc: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
    netOpen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    let graphData = [];
    const graphLinks = [];
    for (let i = 0; i <= 14; i++) {
      const item = i * 100;
      graphData.push({ name: `-1000,${item}`, value: [-1000, item] });
      graphData.push({ name: `1000,${item}`, value: [1000, item] });
      graphLinks.push({ source: `-1000,${item}`, target: `1000,${item}` });
    }
    for (let i = 0; i <= 20; i++) {
      const item = (i - 10) * 100;
      graphData.push({ name: `${item},1400`, value: [item, 1400] });
      graphData.push({ name: `${item},0`, value: [item, 0] });
      graphLinks.push({ source: `${item},0`, target: `${item},1400` });
    }
    graphData = [...new Set(graphData.map((one) => JSON.stringify(one)))].map(
      (one) => JSON.parse(one)
    );

    return {
      mapName: `geo-map-${this.id}`,
      myChart: null,
      option: {
        title: {
          text: '',
          left: 20,
          top: 20,
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
        },
        geo: {
          name: 'eLemur-bg',
          type: 'map',
          map: null,
          roam: true,
          zoom: 1,
          animationDurationUpdate: 0,
          show: false,
          projection: {
            project: (point) => point,
            unproject: (point) => point,
          },
        },
        series: [
          {
            name: 'eLemur',
            type: 'map',
            projection: {
              project: (point) => point,
              unproject: (point) => point,
            },
            map: null,
            roam: true,
            zoom: 1,
            animationDurationUpdate: 0,
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [],
          },
          {
            type: 'graph',
            zlevel: -1,
            zoom: 1,
            coordinateSystem: 'geo',
            animationDurationUpdate: 0,
            roam: true,
            lineStyle: {
              width: 1,
              curveness: 0,
            },
            data: graphData.map((item, index) => {
              const label = {
                color: '#ccc',
                offset:
                  // eslint-disable-next-line no-nested-ternary
                  index >= 30 ? [0, -10] : index === 0 ? [0, -10] : [30, 0],
                show: index % 4 === 1 || index === 0,
                formatter: (params) => this.valueFormat(params, index),
              };

              return {
                ...item,
                label,
                itemStyle: {
                  color: '#b2b2b2',
                },
                tooltip: {
                  formatter: (params) => this.valueFormat(params, index),
                },
              };
            }),
            links: graphLinks,
            symbolSize: 3,
            // symbol: 'none',
          },
        ],
      },
    };
  },
  async mounted() {
    const mapdata = await this.getMapData(this.id);
    this.mapChartInit(mapdata);
  },
  destroyed() {
    window.removeEventListener('resize', () => {
      this.myChart.clear();
    });
    // eslint-disable-next-line no-unused-expressions
    this.myChart && this.myChart.dispose();
  },
  methods: {
    async getMapData(mapCode = '2') {
      // const res = await import(
      //   `../../../locals/geojson/eLemur_geojson_slice${mapCode}.json`
      // );
      // return res.default;
      const res = await axios.get(
        `https://fenglab.xyz/static/lemur/geojson/eLemur_geojson_slice${mapCode}.json`
      );
      return res.data;
    },
    mapChartInit(mapJson) {
      console.log('mapChartInit-->', mapJson);
      if (this.myChart) {
        this.myChart.clear();
      }
      if (!this.netOpen) {
        this.option.series[1] = {};
      }
      this.option.series[0].map = this.mapName;
      this.option.geo.map = this.mapName;
      const chartDom = document.getElementById(`geo-map-${this.id}`);
      echarts.registerMap(this.mapName, { geoJSON: mapJson });
      this.myChart = echarts.init(chartDom);
      const seriesData = mapJson.features.map((one) => {
        const id = one.properties.id;
        const valueObj = {
          id,
          DAPI: this.eeumRegionDesc[id]['DAPI density (# / um^3)'],
          NeuN: this.eeumRegionDesc[id]['NeuN density (# / um^3)'],
          PV: this.eeumRegionDesc[id]['PV density (# / um^3)'],
          NeuronCellRatio:
            this.eeumRegionDesc[id]['NeuN density (# / um^3)'] /
            this.eeumRegionDesc[id]['DAPI density (# / um^3)'],
          PVNeuronRatio:
            this.eeumRegionDesc[id]['PV density (# / um^3)'] /
            this.eeumRegionDesc[id]['NeuN density (# / um^3)'],
        };
        return {
          name: one.properties.name,
          value: valueObj[this.mtype],
          itemStyle: {
            backgroundColor: '#fff',
            areaColor: `#${this.eeumRegionDesc[id].color_hex_triplet}`,
          },
        };
      });
      this.option.series[0].data = seriesData;
      if (this.mtype !== 'id') {
        let maxData = 1;
        let minData = 0;
        let precision = 2;
        if (this.mtype === 'NeuronCellRatio') {
          // this.option.title.text = 'Neuron/Cell Ratio';
          this.option.series[0].name = 'Neuron/Cell Ratio';
        } else if (this.mtype === 'PVNeuronRatio') {
          // this.option.title.text = 'PV/Neuron Ratio';
          this.option.series[0].name = 'PV/Neuron Ratio';
          const valueArr = Object.values(this.eeumRegionDesc).map(
            (one) =>
              one['PV density (# / um^3)'] / one['NeuN density (# / um^3)']
          );
          maxData = Math.max(...valueArr);
          minData = 0;
        } else {
          const showType = `${this.mtype} density (# / um^3)`;
          // this.option.title.text = showType.slice(0, -11);
          const valueArr = Object.values(this.eeumRegionDesc).map(
            (one) => one[showType]
          );
          maxData = Math.max(...valueArr);
          minData = Math.min(...valueArr);
          this.option.series[0].name = showType;
          precision = 10;
        }
        this.option.visualMap = {
          left: 'right',
          min: minData,
          max: maxData,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026',
            ],
          },
          precision,
          calculable: true,
          itemHeight: this.full ? 160 : 80,
          itemWidth: this.full ? 20 : 14,
          // textStyle: {
          //   color: '#ffdddd',
          // },
        };
      }
      this.myChart.showLoading('default', {
        text: 'loading...',
        color: '#24a36f',
        textColor: '#24a36f',
      });
      this.myChart.setOption(this.option);

      this.myChart.on('georoam', async (params) => {
        const chartOption = this.myChart.getOption();
        if (params.zoom !== null || params.zoom !== undefined) {
          chartOption.geo[0].zoom = chartOption.series[0].zoom;
          chartOption.series[1].zoom = chartOption.series[0].zoom;
          chartOption.geo[0].animationDurationUpdate = 0;
          chartOption.series[0].animationDurationUpdate = 0;
          chartOption.series[1].animationDurationUpdate = 0;
        }
        chartOption.geo[0].center = chartOption.series[0].center;
        chartOption.series[1].center = chartOption.series[0].center;
        this.myChart.setOption(chartOption);
      });
      setTimeout(() => {
        this.myChart.hideLoading();
      });
      window.addEventListener('resize', () => {
        this.myChart.resize();
      });
    },
    valueFormat(params, index) {
      let label = '0';
      if (params.name) {
        label =
          index >= 30 || index === 0
            ? `${params.name.split(',')[0] / 100} mm`
            : `${params.name.split(',')[1] / 100} mm`;
      }
      return label;
    },
  },
};
</script>

<style scoped lang="scss">
.geo-map-wrap {
  height: 28vh;
}
.geo-full-map-wrap {
  height: 60vh;
}
</style>
