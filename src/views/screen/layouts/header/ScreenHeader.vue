<template>
  <div :class="`${prefixCls}`">
    <span :class="`${prefixCls}-title`">{{ route.meta.title || route.query.name }}</span>
    <slot name="headerContent"></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'ScreenHeader',
    components: {},
    setup() {
      const route = useRoute();
      const { prefixCls } = useDesign('screen-header');
      return {
        prefixCls,
        route,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-screen-header';
  @keyframes word {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 0 -200%;
    }
  }
  .@{prefix-cls} {
    &-title {
      font-size: 46px;
      font-family: YouSheBiaoTiHei;
      font-style: normal;
      font-weight: 400;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient(
        to bottom,
        #fff 40.47%,
        rgba(237, 245, 253, 0.8) 50%,
        rgba(236, 243, 252, 0.6) 75%,
        #fff 100%
      );
      background-size: 100% 200%;
      background-clip: text;
      animation: word 4s linear infinite;
    }
  }
</style>
