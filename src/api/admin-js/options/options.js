import { componentLoader, Components, Pages } from '../components.js'
import Announcements from '../../http/models/announcements.model.js'
import locale from '../locale/index.js'

export const option = {
  assets: {
    styles: ['/public/style/style.css'],
  },
  locale,
  pages: {
    contentParser: {
      component: Pages.ContentParserPage,
      label: 'Content parser',
      handler: async () => {
        return {
          text: 'I am fetched from the backend',
        }
      },
    },
    settings: {
      component: Pages.SettingsPage,
      label: 'Settings (demo)',
    },
  },
  componentLoader,
  resources: [
    {
      resource: Announcements,
      options: {
        actions: {
          edit: {
            isAccessible: false,
            isVisible: false,
          },
          delete: {
            isAccessible: false,
            isVisible: false,
          },
        },
        listProperties: [
          'category',
          'img',
          'title',
          'price',
          'proizvodstvo',
          'skorosti',
          'probeg',
        ],
        showProperties: [
          'img',
          'title',
          'category',
          'link',
          'price',
          'proizvodstvo',
          'dvigatel',
          'moshtnost',
          'euro',
          'skorosti',
          'probeg',
        ],
        sort: {
          price: 'updatedAt',
          direction: 'desc',
        },
        properties: {
          img: {
            type: 'string',
            description: 'Image',
            components: {
              list: Components.CustomImage,
              show: Components.CustomImage,
            },
          },
          title: {
            type: 'string',
            description: 'Title and link to the announcement in the site',
            components: {
              list: Components.CustomListTitle,
              show: Components.CustomShowTitle,
            },
          },
        },
      },
    },
  ],
  rootPath: '/admin',
}
