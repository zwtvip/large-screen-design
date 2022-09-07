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
  .@{prefix-cls} {
    &-title {
      font-size: 42px;
      font-family: YouSheBiaoTiHei;
      font-style: italic;
    }
  }
</style>
