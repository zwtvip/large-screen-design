import { defHttp } from '/@/utils/http/axios';
import { ThemeListParams, ThemeListGetResultModel } from './model/themeModel';

enum Api {
  DEMO_LIST = '/screen/getThemeList',
}

/**
 * @description: Get sample list value
 */

export const themeListApi = (params: ThemeListParams) =>
  defHttp.get<ThemeListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
