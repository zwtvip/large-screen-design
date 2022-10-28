<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="选择卡片"
    width="500px"
    @ok="handleSubmit"
  >
    <List :pagination="paginationProp">
      <template #header>
        <div class="">
          <BasicForm
            :labelWidth="100"
            @register="registerForm"
            :schemas="searchFormSchema"
            :showActionButtonGroup="false"
          />
        </div>
      </template>
      <template v-for="item in moduleList" :key="item.moduleName">
        <ListItem>
          <Card :hoverable="true" :class="`${prefixCls}__card`">
            <template #title> {{ item.moduleName }} </template>
            <template #extra>
              <div :class="`${prefixCls}__card-extra`">
                <Checkbox v-model:checked="item.checked" @change="handleChange($event, item)">
                  选中卡片
                </Checkbox>
              </div>
            </template>
            <template #cover>
              <!-- <Image :src="item.images[0]" /> -->
            </template>
          </Card>
        </ListItem>
      </template>
    </List>
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { List, Card, Checkbox } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useScreenStore } from '/@/store/modules/screen';
  import type { CardInfo, ModuleInfo } from '/#/screen';
  import { CardItem } from '/#/screen';
  import { searchFormSchema } from './card.data';

  const ListItem = List.Item;
  let cardInfo = {} as CardInfo;
  let tempModuleInfo = {} as ModuleInfo;
  const isUpdate = ref(true);
  const cardList = ref<CardItem[]>([]);
  const prefixCls = ref('module-list');
  const screenStore = useScreenStore();
  const emit = defineEmits(['register', 'success']);
  const [registerForm, { resetFields, setFieldsValue, getFieldsValue }] = useForm();
  screenStore.setModuleList();
  const moduleList = screenStore.getModuleList;

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    cardInfo = data.record;
    resetFields();
    moduleList.forEach((moduleInfo) => {
      moduleInfo.checked = false;
      if (moduleInfo.moduleName === cardInfo.cardName) {
        moduleInfo.checked = true;
      }
    });
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });

  async function handleSubmit() {
    try {
      // const values = await validate();
      setDrawerProps({ confirmLoading: true });
      cardInfo.cardName = tempModuleInfo.moduleName || cardInfo.cardName;
      cardInfo.filename = tempModuleInfo.filename || cardInfo.cardName;
      cardInfo = Object.assign(cardInfo, getFieldsValue());
      emit('success', cardInfo);
      closeDrawer();
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

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

  function handleChange(e: any, moduleInfo) {
    moduleList.forEach((json) => {
      json.checked = false;
    });
    moduleInfo.checked = e.target.checked;
    if (moduleInfo.checked) {
      tempModuleInfo = moduleInfo;
    }
  }

  //分页相关
  const page = ref(1);
  const pageSize = ref(12);
  const total = ref(moduleList.length);
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
  .module-list {
    &__content {
      // overflow: auto;
      // height: 100%;
      // padding: 16px;
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;

      :deep(.ant-card-cover) {
        .ant-image-img {
          height: 270px;
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
