import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { resultPageSuccess } from '../_util';

function getRandomPics(count = 10): string[] {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(Random.image('800x600', Random.color(), Random.color(), Random.title()));
  }
  return arr;
}

const themeList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 30; index++) {
    result.push({
      themeId: `${index}`,
      themeName: '@cname()',
      imgUrl: '@curl()',
      images: getRandomPics(Math.ceil(Math.random() * 3) + 1),
      createTime: `@date('yyyy-MM-dd HH:mm:ss')`,
      updateTime: `@date('yyyy-MM-dd HH:mm:ss')`,
      'no|100000-10000000': 100000,
      'status|1': ['normal', 'enable', 'disable'],
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/screen/getThemeList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, themeList);
    },
  },
] as MockMethod[];
