import { ComponentLoader } from 'adminjs'

export const componentLoader = new ComponentLoader()

const add = (...args) => componentLoader.add(...args)

export const Components = {
  CustomImage: add('CustomImage', './components/CustomImage.jsx'),
  CustomListTitle: add('CustomListTitle', './components/CustomListTitle.jsx'),
  CustomShowTitle: add('CustomShowTitle', './components/CustomShowTitle.jsx'),
}

export const Pages = {
  ContentParserPage: add('ContentParserPage', './pages/ContentParserPage.jsx'),
  SettingsPage: add('SettingsPage', './pages/SettingsPage.jsx'),
}
