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
            <Button type="primary" @click="handleAdd"> 新增主题 </Button>
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
        <template v-for="item in themeList" :key="item.title">
          <a-col :span="6">
            <a-list-item>
              <BorderBoxAnimation>
                <a-card :hoverable="false" :class="`${prefixCls}__card`" class="h-full w-full">
                  <template #title> {{ item.themeName }} </template>
                  <template #extra>
                    <div :class="`${prefixCls}__card-extra`">
                      <Tooltip title="管理主题">
                        <AppstoreOutlined class="icon" @click="handleManage(item)" />
                      </Tooltip>
                      <Tooltip title="查看主题">
                        <FolderViewOutlined class="icon" @click="handleView(item)" />
                      </Tooltip>
                      <Tooltip title="编辑主题">
                        <EditOutlined class="icon" @click="handleEdit(item)" />
                      </Tooltip>
                      <Tooltip title="删除主题">
                        <Popconfirm
                          title="是否删除该主题?"
                          ok-text="是"
                          cancel-text="否"
                          @confirm="confirm(item.themeId)"
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
              </BorderBoxAnimation>
            </a-list-item>
          </a-col>
        </template>
      </a-row>
    </a-list>
    <ThemeModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup name="ThemeList">
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    EditOutlined,
    DeleteOutlined,
    RedoOutlined,
    TableOutlined,
    FolderViewOutlined,
    AppstoreOutlined,
  } from '@ant-design/icons-vue';
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
  import ThemeModal from './modals/ThemeModal.vue';
  import { Button } from '/@/components/Button';
  import BorderBoxAnimation from '../components/border-box-animation.vue';
  import { useSlider, grid, searchFormSchema } from './data';
  import { useScreenStore } from '/@/store/modules/screen';
  import type { ThemeItem } from '/#/screen';

  const ACard = Card;
  const AList = List;
  const ARow = Row;
  const ACol = Col;
  const AListItem = List.Item;
  const { push } = useRouter();
  const prefixCls = ref('theme-list');
  const themeList = ref<ThemeItem[]>([]);
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

  // 主题操作
  async function fetch(p = {}) {
    const res = await screenStore.getThemeListData({
      page: page.value,
      pageSize: pageSize.value,
      ...p,
    });
    themeList.value = res.items;
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
    openModal(true, {
      record,
      isUpdate: true,
    });
  }
  function handleManage(record: Recordable) {
    push({
      path: '/screen/themeManage',
      query: {
        id: record.themeId,
        name: record.themeName,
      },
    });
  }
  function handleView(record: Recordable) {
    push({
      path: '/screen/themeView',
      query: {
        id: record.themeId,
        name: record.themeName,
      },
    });
  }
  function handleSuccess({ isUpdate }) {
    if (isUpdate) {
    } else {
    }
  }
  const confirm = (id: string) => {
    const index = themeList.value.findIndex((item) => item.themeId === id);
    themeList.value.splice(index, 1);
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
  .theme-list {
    &__content {
      overflow: auto;
      height: 100%;
      padding: 16px;

      :deep(.vben-basic-form .ant-form-item:not(.ant-form-item-with-help)) {
        margin-bottom: 0;
      }

      :deep(.ant-list-split .ant-list-header) {
        border-bottom: 1px solid #074586;
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
          margin-left: 10px;
        }
      }
    }
  }
</style>
