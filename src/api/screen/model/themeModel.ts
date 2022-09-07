import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
import type { ThemeItem } from '/#/screen';
/**
 * @description: Request list interface parameters
 */
export type ThemeListParams = BasicPageParams;

/**
 * @description: Request list return value
 */
export type ThemeListGetResultModel = BasicFetchResult<ThemeItem>;
