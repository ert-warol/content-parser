import { ComponentLoader } from 'adminjs'

export const componentLoader = new ComponentLoader()

const add = (...args) => componentLoader.add(...args)
const override = (...args) => componentLoader.override(...args)

override('ActionHeader', './components/custom/ActionHeader')

export const Components = {
  CustomImage: add('CustomImage', './components/custom/Image.jsx'),
  CustomListTitle: add('CustomListTitle', './components/custom/ListTitle.jsx'),
  CustomShowTitle: add('CustomShowTitle', './components/custom/ShowTitle.jsx'),
}

export const Pages = {
  ContentParserPage: add('ContentParserPage', './pages/ContentParserPage.jsx'),
  SettingsPage: add('SettingsPage', './pages/SettingsPage.jsx'),
}
