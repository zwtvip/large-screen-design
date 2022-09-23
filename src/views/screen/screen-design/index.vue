<template>
  <LayoutFeatures />
  <PageWrapper :class="`${prefixCls}`" fixedHeight contentFullHeight dense>
    <template #title>
      <ScreenHeader />
    </template>
    <template #extra>
      <HeaderDropdown />
    </template>
    <ScrollXReverseTransition>
      <component :is="`${currentComp}`" v-if="currentComp" />
    </ScrollXReverseTransition>
  </PageWrapper>
  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="options"
  />
</template>

<script>
  import { defineComponent, ref, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { PageWrapper } from '/@/components/Page';
  import { ScrollXReverseTransition } from '/@/components/Transition/index';
  import { useDesign } from '/@/hooks/web/useDesign';
  import ScreenHeader from '/@/views/screen/layouts/header/ScreenHeader.vue';
  import HeaderDropdown from '/@/views/screen/layouts/header/HeaderDropdown.vue';
  import { loadFull } from 'tsparticles';
  import options from '/@/utils/particles';

  export default defineComponent({
    name: 'ScreenWrapper',
    components: {
      LayoutFeatures: createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
      PageWrapper,
      ScrollXReverseTransition,
      ScreenHeader,
      HeaderDropdown,
      ThemeList: createAsyncComponent(() =>
        import('/@/views/screen/layouts/content/theme-list/index.vue'),
      ),
      CardList: createAsyncComponent(() =>
        import('/@/views/screen/layouts/content/card-list/index.vue'),
      ),
      ThemeView: createAsyncComponent(() =>
        import('/@/views/screen/layouts/content/theme-view/index.vue'),
      ),
      ThemeManage: createAsyncComponent(() =>
        import('/@/views/screen/layouts/content/theme-manage/index.vue'),
      ),
    },
    setup() {
      const { prefixCls } = useDesign('screen-wrapper');
      const route = useRoute();
      let currentComp = ref('');

      const particlesInit = async (engine) => {
        await loadFull(engine);
      };

      const particlesLoaded = async (container) => {
        console.log('Particles container loaded', container);
      };
      watch(
        () => route.name,
        () => {
          setTimeout(() => {
            currentComp.value = route.name;
          }, 300);
        },
        { immediate: true },
      );
      onMounted(() => {
        const wrapper = document.querySelector(`.${prefixCls}`);
        if (wrapper) {
          htmlRoot.setAttribute('data-theme', 'blueDark');
        }
      });
      return {
        prefixCls,
        currentComp,
        options,
        particlesInit,
        particlesLoaded,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-screen-wrapper';
  .@{prefix-cls} {
    // background: url('/@/assets/images/screen/bg.jpg');
    // background-size: 100% 100%;
    position: relative;
    z-index: 1;

    :deep(.ant-page-header) {
      padding: 0;
      height: @screen-header-height;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: url('/@/assets/images/screen/header-bg.png');
      background-size: 100% 100%;

      .ant-page-header-heading {
        width: 100%;
        height: 100%;
        padding: 0 16px;
        align-items: center;

        .ant-page-header-heading-title {
          color: @white;
          overflow: visible;
        }
      }
    }

    :deep(.ant-card-head-wrapper) {
      .ant-card-head-title,
      .ant-card-extra {
        padding: 8px 0;
        color: @white;
      }

      .ant-card-head-title {
        font-family: YouSheBiaoTiHei;
        font-size: 20px;
      }
    }
  }
</style>
