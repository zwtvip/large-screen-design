import { FormSchema } from '/@/components/Table';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'InputSearch',
    label: '卡片名称',
    colProps: {
      span: 24,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'w',
    component: 'InputNumber',
    label: 'width',
    colProps: {
      span: 12,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'h',
    component: 'InputNumber',
    label: 'height',
    colProps: {
      span: 12,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'x',
    component: 'InputNumber',
    label: 'left',
    colProps: {
      span: 12,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'y',
    component: 'InputNumber',
    label: 'top',
    colProps: {
      span: 12,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
];
