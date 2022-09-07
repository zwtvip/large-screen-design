import { Component } from 'vue';

// 大屏模块信息
export interface ModuleInfo {
  moduleId: string;
  moduleName: string;
  checked: boolean;
  filename: string;
  [key: string]: Component | string | boolean;
}

// 大屏卡片信息
export interface CardInfo {
  cardId: string;
  cardName: string;
  filename: string;
  x: number;
  y: number;
  h: number;
  w: number;
  parent: boolean;
  active: boolean;
  [key: string]: Component | string | boolean | number;
}

// 大屏主题列表
export interface ThemeItem {
  themeId: string;
  themeName: string;
  imgUrl: string;
  createTime: string;
  updateTime: string;
  images: string[];
}

// 大屏卡片列表
export interface CardItem {
  cardId: string;
  cardName: string;
  imgUrl: string;
  createTime: string;
  updateTime: string;
  images: string[];
}
