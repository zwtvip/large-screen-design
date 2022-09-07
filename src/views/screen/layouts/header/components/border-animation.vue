<template>
  <div class="border-liner" :ref="ref">
    <svg class="border-svg-container" :width="width" height="2">
      <defs>
        <path :id="path" :d="pathD" fill="transparent" />
        <radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <mask :id="mask">
          <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
            <animateMotion :dur="`${dur}s`" :path="pathD" rotate="auto" repeatCount="indefinite" />
          </circle>
        </mask>
      </defs>
      <use
        :stroke="color"
        :stroke-width="strokeWidth"
        :xlink:href="`#${path}`"
        :mask="`url(#${mask})`"
      >
        <animate
          attributeName="stroke-dasharray"
          :from="`0, ${length}`"
          :to="`${length}, 0`"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </use>
    </svg>
  </div>
</template>

<script>
  import autoResize from '../assets/mixin/autoResize';
  import { uuid } from '../assets/util/index';

  export default {
    name: 'BorderBoxAnimation',
    mixins: [autoResize],
    props: {
      strokeWidth: {
        type: [Number, String],
        default: 1,
      },
      color: {
        type: String,
        default: '#4fd2dd',
      },
      dur: {
        type: Number,
        default: 4,
      },
    },
    data() {
      const id = uuid();
      return {
        ref: 'border-box',
        path: `border-box-path-${id}`,
        gradient: `border-box-gradient-${id}`,
        mask: `border-box-mask-${id}`,
        mergedColor: [],
      };
    },
    computed: {
      length() {
        const { width } = this;
        return width - 5;
      },
      pathD() {
        const { width } = this;
        return `M1, 1 L${width - 1}, 1 L${width - 1}, 0.5 L1, 0.5 L1, 1`;
      },
    },
  };
</script>

<style lang="less">
  .border-liner {
    position: relative;
    width: 100%;
    height: 2px;

    .border-svg-container {
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0px;
      top: 0px;
    }
  }
</style>
