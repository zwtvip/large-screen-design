import { ref } from 'vue';

import { FormSchema } from '/@/components/Table';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'InputSearch',
    label: '主题名称',
    colProps: {
      span: 24,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
];

// 每行个数
export const grid = ref(4);
// slider属性
export const useSlider = (min = 6, max = 12) => {
  // 每行显示个数滑动条
  const getMarks = () => {
    const l = {};
    for (let i = min; i < max + 1; i++) {
      l[i] = {
        style: {
          color: '#fff',
        },
        label: i,
      };
    }
    return l;
  };
  return {
    min,
    max,
    marks: getMarks(),
    step: 1,
  };
};
