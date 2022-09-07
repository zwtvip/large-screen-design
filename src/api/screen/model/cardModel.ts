import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
import type { CardItem } from '/#/screen';
/**
 * @description: Request list interface parameters
 */
export type CardListParams = BasicPageParams;

/**
 * @description: Request list return value
 */
export type CardListGetResultModel = BasicFetchResult<CardItem>;
