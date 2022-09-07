<template>
  <div :class="`${prefixCls}`">
    <p>
      left: <b>{{ record.x }}</b>
    </p>
    <p>
      top: <b>{{ record.y }}</b>
    </p>
    <p>
      width: <b>{{ record.w }}</b>
    </p>
    <p>
      height: <b>{{ record.h }}</b>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'CardPosition',
    components: {},
    props: {
      record: {
        type: Object,
        required: true,
        default: () => {
          return {};
        },
      },
    },
    setup() {
      const { prefixCls } = useDesign('card-position');
      return {
        prefixCls,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-card-position';
  .@{prefix-cls} {

  }
</style>
