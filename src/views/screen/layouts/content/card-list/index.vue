<template>
  <div :class="`${prefixCls}__content`">
    <a-list :pagination="paginationProp">
      <template #header>
        <div class="flex justify-between">
          <BasicForm
            :labelWidth="100"
            @register="registerForm"
            :schemas="searchFormSchema"
            :showActionButtonGroup="false"
          />
          <div class="flex justify-end space-x-2">
            <Button type="primary" @click="handleAdd"> 新增卡片 </Button>
            <Tooltip>
              <template #title>
                <div class="w-50">每行显示数量</div
                ><Slider
                  id="slider"
                  v-bind="sliderProp"
                  v-model:value="grid"
                  @change="sliderChange"
              /></template>
              <Button><TableOutlined /></Button>
            </Tooltip>
            <Tooltip @click="fetch">
              <template #title>刷新</template>
              <Button><RedoOutlined /></Button>
            </Tooltip>
          </div>
        </div>
      </template>
      <a-row :gutter="16">
        <template v-for="item in cardList" :key="item.title">
          <a-col :span="6">
            <a-list-item>
              <a-card :hoverable="true" :class="`${prefixCls}__card`">
                <template #title> {{ item.cardName }} </template>
                <template #extra>
                  <div :class="`${prefixCls}__card-extra`">
                    <Tooltip title="编辑卡片">
                      <EditOutlined class="icon mx-4" @click="handleEdit(item)" />
                    </Tooltip>
                    <Tooltip title="删除卡片">
                      <Popconfirm
                        title="是否删除该卡片?"
                        ok-text="是"
                        cancel-text="否"
                        @confirm="confirm(item.cardId)"
                        @cancel="cancel"
                      >
                        <DeleteOutlined class="icon" />
                      </Popconfirm>
                    </Tooltip>
                  </div>
                </template>
                <template #cover>
                  <Image :src="item.images[0]" />
                </template>
              </a-card>
            </a-list-item>
          </a-col>
        </template>
      </a-row>
    </a-list>
    <CardModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup name="CardList">
  import { computed, onMounted, ref } from 'vue';
  import { EditOutlined, RedoOutlined, TableOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import {
    List,
    Card,
    Row,
    Col,
    Image,
    Tooltip,
    Slider,
    Popconfirm,
    message,
  } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useModal } from '/@/components/Modal';
  import CardModal from './modals/CardModal.vue';
  import { Button } from '/@/components/Button';
  import { useScreenStore } from '/@/store/modules/screen';
  import { useSlider, grid, searchFormSchema } from './data';
  import type { CardItem } from '/#/screen';

  const ACard = Card;
  const AList = List;
  const ARow = Row;
  const ACol = Col;
  const AListItem = List.Item;
  const prefixCls = ref('card-list');
  const cardList = ref<CardItem[]>([]);
  const screenStore = useScreenStore();
  const [registerForm] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: searchFormSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { openModal }] = useModal();
  // 获取slider属性
  const sliderProp = computed(() => useSlider(4));

  // 卡片操作
  async function fetch(p = {}) {
    const res = await screenStore.getCardListData({
      page: page.value,
      pageSize: pageSize.value,
      ...p,
    });
    cardList.value = res.items;
    total.value = res.total;
  }
  function sliderChange(n) {
    pageSize.value = n * 4;
    fetch();
  }
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }
  function handleEdit(record: Recordable) {
    console.log(record);
    openModal(true, {
      record,
      isUpdate: true,
    });
  }
  function handleSuccess({ isUpdate }) {
    if (isUpdate) {
    } else {
    }
  }
  const confirm = (id: string) => {
    const index = cardList.value.findIndex((item) => item.cardId === id);
    cardList.value.splice(index, 1);
    message.success('删除成功!');
  };

  const cancel = (e: MouseEvent) => {
    console.log(e);
  };
  onMounted(() => {
    fetch();
  });
  //分页相关
  const page = ref(1);
  const pageSize = ref(12);
  const total = ref(0);
  const paginationProp = ref({
    showSizeChanger: false,
    showQuickJumper: true,
    pageSize,
    current: page,
    total,
    showTotal: (total) => `总 ${total} 条`,
    onChange: pageChange,
    onShowSizeChange: pageSizeChange,
  });

  function pageChange(p, pz) {
    page.value = p;
    pageSize.value = pz;
    fetch();
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
    fetch();
  }
</script>

<style lang="less" scoped>
  .card-list {
    &__content {
      overflow: auto;
      height: 100%;
      padding: 16px;

      :deep(.vben-basic-form .ant-form-item:not(.ant-form-item-with-help)) {
        margin-bottom: 0;
      }
    }

    &__card {
      :deep(.ant-card-cover) {
        .ant-image {
          vertical-align: bottom;
        }
      }

      &-title {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 500;
        color: @text-color;
      }

      &-extra {
        .icon {
          font-size: 18px;
        }
      }
    }
  }
</style>
