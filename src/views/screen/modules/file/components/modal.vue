<template>
  <div :class="`${prefixCls}__content`">
    <Card :hoverable="true" :class="`${prefixCls}__card`">
      <template #title> {{ '测试66666666' }} </template>
      <template #extra>
        <div :class="`${prefixCls}__card-extra`">
          <!-- <Tooltip title="管理主题">
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
              title="是否删除主题?"
              ok-text="是"
              cancel-text="否"
              @confirm="confirm(item.id)"
              @cancel="cancel"
            >
              <DeleteOutlined class="icon" @click="handleDelete(item.id)" />
            </Popconfirm>
          </Tooltip> -->
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { EditOutlined, DeleteOutlined, FolderViewOutlined } from '@ant-design/icons-vue';
  import { Card } from 'ant-design-vue';

  const prefixCls = ref('card-wrapper');
</script>

<style lang="less" scoped>
  .card-wrapper {
    &__content {
      overflow: auto;
      height: 100%;
      padding: 16px;
    }
    &__card {
      width: 100%;
      margin-bottom: -8px;
      &-title {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 500;
        color: @text-color;
      }
    }
  }
</style>
