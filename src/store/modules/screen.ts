import { defineStore } from 'pinia';
import type { ModuleInfo, CardInfo, CardItem, ThemeItem } from '/#/screen';
import { MODULE_LIST_KEY, CARD_LIST_KEY, TEMP_CARD_LIST_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { buildUUID } from '/@/utils/uuid';
import { CardListParams, CardListGetResultModel } from '/@/api/screen/model/cardModel';
import { ThemeListParams, ThemeListGetResultModel } from '/@/api/screen/model/themeModel';
import { cardListApi } from '/@/api/screen/card';
import { themeListApi } from '/@/api/screen/theme';
import { moduleList } from '/@/views/screen/layouts/content/theme-manage/data';

interface ScreenState {
  moduleList: ModuleInfo[];
  cardList: CardItem[];
  themeList: ThemeItem[];
  tempCardList: CardInfo[];
}

export const useScreenStore = defineStore({
  id: 'app-screen',
  state: (): ScreenState => ({
    moduleList: [],
    cardList: [],
    themeList: [],
    tempCardList: [],
  }),
  getters: {
    getModuleList(): ModuleInfo[] {
      return this.moduleList || getAuthCache<ModuleInfo[]>(MODULE_LIST_KEY) || [];
    },
    getCardList(): CardItem[] {
      return this.cardList.length > 0 ? this.cardList : getAuthCache<CardItem[]>(CARD_LIST_KEY);
    },
    getTempCardList(): CardInfo[] {
      const headerHeight = 76;
      const realWidth = window.innerWidth;
      const realHeight = window.innerHeight - headerHeight;
      const gutter = 20;
      const width = (realWidth - 5 * gutter) / 4;
      const height = (realHeight - 4 * gutter) / 3;
      this.tempCardList = [];
      // 初始化卡片数据
      for (let i = 0; i < 4; i++) {
        this.tempCardList.push({
          cardId: buildUUID(),
          cardName: '测试卡片' + (i + 1),
          filename: 'CardPosition',
          x: i * (width + gutter),
          y: 0,
          h: height,
          w: width,
          parent: true,
          active: false,
        });
      }
      return getAuthCache<CardInfo[]>(TEMP_CARD_LIST_KEY) &&
        getAuthCache<CardInfo[]>(TEMP_CARD_LIST_KEY).length > 0
        ? getAuthCache<CardInfo[]>(TEMP_CARD_LIST_KEY)
        : this.tempCardList;
    },
  },
  actions: {
    setModuleList() {
      this.moduleList = moduleList;
      setAuthCache(MODULE_LIST_KEY, moduleList);
    },
    setTempCardList(tempCardList: CardInfo[]) {
      this.tempCardList = tempCardList;
      setAuthCache(TEMP_CARD_LIST_KEY, tempCardList);
    },
    setCardList(cardList: CardItem[]) {
      this.cardList = cardList;
      setAuthCache(CARD_LIST_KEY, cardList);
    },
    async getThemeListData(params: ThemeListParams): Promise<ThemeListGetResultModel> {
      try {
        const data = await themeListApi(params);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: 请求卡片列表 cardList
     */
    async getCardListData(params: CardListParams): Promise<CardListGetResultModel> {
      try {
        const data = await cardListApi(params);
        this.setCardList(data.items);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
