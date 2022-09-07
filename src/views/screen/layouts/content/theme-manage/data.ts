import { Component } from 'vue';
import type { ModuleInfo } from '/#/screen';
import { buildUUID } from '/@/utils/uuid';

interface FileType {
  [key: string]: Component;
}

// import.meta.glob() 异步导入模块
const files = import.meta.glob('../../../../../views/screen/modules/**/*index.vue');
const mod = {};
for (const path in files) {
  files[path]().then((res) => {
    const temp = path.split('/');
    const filename = temp[temp.length - 2];
    let strArr: string[] = [];
    let str = '';
    if (filename.indexOf('-') !== -1) {
      strArr = filename.split('-');
      strArr = strArr.map((val) => val.trim().toLowerCase().replace(val[0], val[0].toUpperCase()));
      str = strArr.join('');
      mod[str] = res.default;
    } else {
      mod[filename.trim().toLowerCase().replace(filename[0], filename[0].toUpperCase())] =
        res.default;
    }
  });
}
Object.keys(mod).forEach((item) => {
  mod[item]['namespaced'] = true;
});

// import.meta.globEager() 直接引入所有的模块
const modules: Record<string, FileType> = import.meta.globEager(
  '../../../../../views/screen/modules/**/*index.vue',
);
const list: ModuleInfo[] = [];
const obj = {};
// 加入到文件集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key]?.default || {};
  const modName = mod.name as string;
  list.push({
    moduleId: buildUUID(),
    [modName]: mod, // 组件
    moduleName: modName, // 组件名称
    checked: false, // 是否选中
    filename: modName, // 文件名称
  });
  obj[modName] = mod;
});

export const moduleList = list;

export const moduleComp = obj;
