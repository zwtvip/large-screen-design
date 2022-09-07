import { defHttp } from '/@/utils/http/axios';
import { CardListParams, CardListGetResultModel } from './model/cardModel';

enum Api {
  DEMO_LIST = '/screen/getCardList',
}

/**
 * @description: Get sample list value
 */

export const cardListApi = (params: CardListParams) =>
  defHttp.get<CardListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
