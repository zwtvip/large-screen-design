<template>
  <div :class="`${prefixCls}`" :style="getContentStyle">
    <div class="ruler-h">
      <span class="n" style="left: 2px">0</span><span class="n" style="left: 52px">50</span>
      <span class="n" style="left: 102px">100</span><span class="n" style="left: 152px">150</span>
      <span class="n" style="left: 202px">200</span><span class="n" style="left: 252px">250</span>
      <span class="n" style="left: 302px">300</span><span class="n" style="left: 352px">350</span>
      <span class="n" style="left: 402px">400</span><span class="n" style="left: 452px">450</span>
      <span class="n" style="left: 502px">500</span><span class="n" style="left: 552px">550</span>
      <span class="n" style="left: 602px">600</span><span class="n" style="left: 652px">650</span>
      <span class="n" style="left: 702px">700</span><span class="n" style="left: 752px">750</span>
      <span class="n" style="left: 802px">800</span><span class="n" style="left: 852px">850</span>
      <span class="n" style="left: 902px">900</span><span class="n" style="left: 952px">950</span>
      <span class="n" style="left: 1002px">1000</span>
      <span class="n" style="left: 1052px">1050</span>
      <span class="n" style="left: 1102px">1100</span>
      <span class="n" style="left: 1152px">1150</span>
      <span class="n" style="left: 1202px">1200</span>
      <span class="n" style="left: 1252px">1250</span>
      <span class="n" style="left: 1302px">1300</span>
      <span class="n" style="left: 1352px">1350</span>
      <span class="n" style="left: 1402px">1400</span>
      <span class="n" style="left: 1452px">1450</span>
      <span class="n" style="left: 1502px">1500</span>
      <span class="n" style="left: 1552px">1550</span>
      <span class="n" style="left: 1602px">1600</span>
      <span class="n" style="left: 1652px">1650</span>
      <span class="n" style="left: 1702px">1700</span>
      <span class="n" style="left: 1752px">1750</span>
      <span class="n" style="left: 1802px">1800</span>
      <span class="n" style="left: 1852px">1850</span>
      <span class="n" style="left: 1902px">1900</span>
      <span class="n" style="left: 1952px">1950</span>
      <span class="n" style="left: 2002px">2000</span>
      <span class="n" style="left: 2052px">2050</span>
      <span class="n" style="left: 2102px">2100</span>
      <span class="n" style="left: 2152px">2150</span>
      <span class="n" style="left: 2202px">2200</span>
      <span class="n" style="left: 2252px">2250</span>
      <span class="n" style="left: 2302px">2300</span>
      <span class="n" style="left: 2352px">2350</span>
      <span class="n" style="left: 2402px">2400</span>
      <span class="n" style="left: 2452px">2450</span>
      <span class="n" style="left: 2502px">2500</span>
    </div>
    <div class="ruler-v">
      <span class="n" style="top: 2px">0</span><span class="n" style="top: 52px">50</span>
      <span class="n" style="top: 102px">100</span><span class="n" style="top: 152px">150</span>
      <span class="n" style="top: 202px">200</span><span class="n" style="top: 252px">250</span>
      <span class="n" style="top: 302px">300</span><span class="n" style="top: 352px">350</span>
      <span class="n" style="top: 402px">400</span><span class="n" style="top: 452px">450</span>
      <span class="n" style="top: 502px">500</span><span class="n" style="top: 552px">550</span>
      <span class="n" style="top: 602px">600</span><span class="n" style="top: 652px">650</span>
      <span class="n" style="top: 702px">700</span><span class="n" style="top: 752px">750</span>
      <span class="n" style="top: 802px">800</span><span class="n" style="top: 852px">850</span>
      <span class="n" style="top: 902px">900</span><span class="n" style="top: 952px">950</span>
      <span class="n" style="top: 1002px">1000</span><span class="n" style="top: 1052px">1050</span>
      <span class="n" style="top: 1102px">1100</span>
      <span class="n" style="top: 1152px">1150</span>
    </div>
    <DraggableContainer class="h-full w-full">
      <Vue3DraggableResizable
        v-for="(item, index) in cardList"
        :key="item.cardId"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :draggable="true"
        :resizable="true"
        :active="item.active"
        @activated="activated(item, index)"
        @deactivated="deactivated(item)"
        @drag-end="dragEnd"
        @resize-end="resizeEnd"
      >
        <BorderBoxAnimation>
          <Card :hoverable="true" :class="`${prefixCls}__card`" class="h-full w-full">
            <template #title>
              <a-input
                v-model:value="item.cardName"
                :bordered="false"
                placeholder="请输入卡片标题"
              />
            </template>
            <template #extra>
              <div :class="`${prefixCls}__card-extra`">
                <Tooltip title="编辑卡片">
                  <EditOutlined class="icon" @click="handleEdit(item)" />
                </Tooltip>
                <Tooltip title="重置卡片">
                  <RedoOutlined class="icon mx-4" @click="handleReset(item)" />
                </Tooltip>
                <Tooltip title="删除卡片">
                  <Popconfirm
                    title="是否删除卡片?"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="confirm(item.cardId)"
                    @cancel="cancel"
                  >
                    <DeleteOutlined
                      v-if="cardList.length > 1"
                      class="icon"
                      @click="handleDelete(item.cardId)"
                    />
                  </Popconfirm>
                </Tooltip>
              </div>
            </template>
            <component :is="item.filename" :record="item" class="currentComp" />
          </Card>
        </BorderBoxAnimation>
      </Vue3DraggableResizable>
    </DraggableContainer>
    <CardDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    inject,
    CSSProperties,
    computed,
    ref,
    unref,
    watch,
    onMounted,
    nextTick,
  } from 'vue';
  import { DraggableContainer } from 'vue3-draggable-resizable';
  import Vue3DraggableResizable from 'vue3-draggable-resizable';
  import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
  import { Card, Tooltip, Popconfirm, message } from 'ant-design-vue';
  import { EditOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import BorderBoxAnimation from '../components/border-box-animation.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { useScreenStore } from '/@/store/modules/screen';
  import { buildUUID } from '/@/utils/uuid';
  import CardDrawer from './modals/CardDrawer.vue';
  import type { CardInfo } from '/#/screen';
  import { moduleComp } from './data';

  export default defineComponent({
    name: 'ThemeManage',
    components: {
      Vue3DraggableResizable,
      DraggableContainer,
      Popconfirm,
      Tooltip,
      Card,
      DeleteOutlined,
      EditOutlined,
      CardDrawer,
      RedoOutlined,
      BorderBoxAnimation,
      ...moduleComp,
    },
    setup() {
      const screenStore = useScreenStore();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { prefixCls } = useDesign('theme-manage');
      const contentHeight = inject('contentHeight') as string;
      const getContentStyle = computed((): CSSProperties => {
        const style: CSSProperties = {};
        style.height = unref(contentHeight);
        return style;
      });
      let currentIndex = ref(-1); // 临时存储当前激活组件的index
      let cardList = ref(screenStore.getTempCardList);

      const activated = (item, index) => {
        item.active = true;
        currentIndex.value = index;
      };
      const deactivated = (item) => {
        item.active = false;
      };
      const dragEnd = ({ x, y }) => {
        cardList.value.forEach((item) => {
          if (item.active) {
            item.x = x;
            item.y = y;
          }
        });
      };
      const resizeEnd = ({ x, y, w, h }) => {
        cardList.value.forEach((item) => {
          if (item.active) {
            item.x = x;
            item.y = y;
            item.w = w;
            item.h = h;
          }
        });
      };
      function handleReset(record: Recordable) {
        cardList.value.forEach((item, index) => {
          if (record.cardId === item.cardId) {
            item.filename = 'CardPosition';
            item.cardName = '测试卡片' + (index + 1);
          }
        });
      }
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          isUpdate: true,
          record,
        });
      }
      async function handleDelete(id: string) {
        console.log(id);
      }
      function handleSuccess(cardInfo) {
        cardList.value.forEach((item) => {
          if (cardInfo.cardId === item.cardId) {
            item.cardName = cardInfo.cardName;
            item.filename = cardInfo.filename;
          }
        });
      }
      const confirm = (id: string) => {
        const index = cardList.value.findIndex((item) => item.cardId === id);
        cardList.value.splice(index, 1);
        message.success('删除成功!');
      };

      const cancel = (e: MouseEvent) => {
        console.log(e);
      };
      watch(
        () => [...cardList.value],
        () => {
          screenStore.setTempCardList(cardList.value);
          nextTick(() => {
            const head = document.querySelector('.currentComp .ant-card-head') as HTMLElement;
            const bordered = document.querySelector(
              '.currentComp .ant-card-bordered',
            ) as HTMLElement;
            const body = document.querySelector('.currentComp .ant-card-body') as HTMLElement;
            if (head && bordered && body) {
              head.style.display = 'none';
              body.style.height = '100%';
              bordered.style.border = 'none';
              body.style.boxSizing = 'border-box';
            }
          });
        },
        { deep: true },
      );
      let copyData: CardInfo[] = [];
      let copyObj = {} as CardInfo;
      onMounted(() => {
        // 绑定键盘事件
        document.onkeydown = function (e: any) {
          e = e || window.event;
          if (e.ctrlKey && e.keyCode == 67) {
            // Ctrl + C  // 复制
            if (currentIndex.value >= 0) {
              copyData = [...cardList.value];
              copyObj = JSON.parse(JSON.stringify(copyData[currentIndex.value]));
            }
          } else if (e.ctrlKey && e.keyCode == 86) {
            // Ctrl + V  // 粘贴
            copyObj.cardId = buildUUID();
            copyObj.x += 50;
            copyObj.y += 50;
            copyData.push(copyObj);
            cardList.value = copyData;
          }
        };
      });
      return {
        prefixCls,
        getContentStyle,
        dragEnd,
        resizeEnd,
        activated,
        deactivated,
        cardList,
        handleReset,
        handleEdit,
        handleDelete,
        confirm,
        cancel,
        registerDrawer,
        handleSuccess,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-theme-manage';
  .@{prefix-cls} {
    padding: 20px;
    position: relative;

    :deep(.ant-card-head-title) {
      .ant-input {
        padding: 0;
      }
    }

    :deep(.ant-card-body) {
      padding: 0;
      color: @white;
      height: calc(100% - 47.42px);

      .currentComp {
        padding: 0;
        height: 100%;

        .ant-card-head {
          display: none;
        }

        .ant-card-bordered {
          border: none;
          padding: 0;
        }

        .ant-card-body {
          height: 100%;
          box-sizing: border-box;
          color: @white;
          background: none;
        }
      }
    }

    .ruler-h,
    .ruler-v {
      // opacity: 0.3;
      position: absolute;
      left: 0;
      top: 0;
      overflow: hidden;
      z-index: 999;

      .n {
        position: absolute;
        font: 10px/1 Arial, sans-serif;
        color: #333;
        cursor: default;
      }
    }

    .ruler-h {
      width: 100%;
      height: 20px;
      left: 20px;
      // opacity: 0.6;
      background: url('/@/assets/images/screen/ruler-h.png') repeat-x;

      .n {
        top: 1px;
      }
    }

    .ruler-v {
      width: 20px;
      height: 100%;
      top: 20px;
      // opacity: 0.6;
      background: url('/@/assets/images/screen/ruler-v.png') repeat-y;

      .n {
        width: 10px;
        left: 3px;
        word-wrap: break-word;
      }
    }
  }
</style>
