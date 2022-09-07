<template>
  <div :class="`${prefixCls}`" :style="getContentStyle">
    <DraggableContainer class="h-full w-full">
      <Vue3DraggableResizable
        v-for="item in cardList"
        :key="item.cardId"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :draggable="false"
        :resizable="false"
        :active="item.active"
      >
        <component :is="item.filename" class="currentComp" />
      </Vue3DraggableResizable>
    </DraggableContainer>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    inject,
    CSSProperties,
    computed,
    unref,
    onMounted,
    nextTick,
  } from 'vue';
  import { DraggableContainer } from 'vue3-draggable-resizable';
  import Vue3DraggableResizable from 'vue3-draggable-resizable';
  import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
  import type { CardInfo } from '/#/screen';
  import { buildUUID } from '/@/utils/uuid';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { moduleComp } from '../theme-manage/data';

  export default defineComponent({
    name: 'ThemeView',
    components: {
      Vue3DraggableResizable,
      DraggableContainer,
      ...moduleComp,
    },
    setup() {
      const { prefixCls } = useDesign('theme-view');
      const contentHeight = inject('contentHeight') as string;
      const getContentStyle = computed((): CSSProperties => {
        const style: CSSProperties = {};
        style.height = unref(contentHeight);
        return style;
      });
      const cardList = [
        {
          cardId: buildUUID(),
          cardName: 'File',
          filename: 'File',
          x: 100,
          y: 100,
          h: 300,
          w: 400,
          parent: true,
          active: false,
        },
        {
          cardId: buildUUID(),
          cardName: 'Map',
          filename: 'Map',
          x: 300,
          y: 500,
          h: 300,
          w: 400,
          parent: true,
          active: false,
        },
      ] as CardInfo[];
      onMounted(() => {
        nextTick(() => {
          const head = document.querySelector('.currentComp .ant-card-head') as HTMLElement;
          const body = document.querySelector('.currentComp .ant-card-body') as HTMLElement;
          if (head && body) {
            body.style.height = 'calc(100% - 58.14px)';
          } else if (!head && body) {
            body.style.height = '100%';
          }
        });
      });
      return {
        prefixCls,
        getContentStyle,
        cardList,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-theme-view';
  .@{prefix-cls} {
    background: @blue-content-bg;

    .currentComp {
      height: 100%;

      :deep(.ant-card) {
        height: 100%;

        .ant-card-body {
          padding: 0;
        }
      }
    }
  }
</style>
