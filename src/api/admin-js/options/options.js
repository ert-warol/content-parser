import { componentLoader, Components } from '../components.js'
import Announcements from '../../http/models/announcements.model.js'

export const option = {
	assets: {
		styles: ['/public/style.css'],
	},
	locale: {
		language: 'en', // default language
		availableLanguages: ['en', 'Bulgarian'], // array of available languages
	},
	pages: {
		contentParser: {
			component: Components.ContentParserPage,
			label: 'Content parser',
		},
		settings: {
			component: Components.SettingsPage,
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
				listProperties: ['category', 'img', 'title', 'price', 'proizvodstvo', 'skorosti', 'probeg'],
				showProperties: ['img', 'category', 'link', 'title', 'price', 'proizvodstvo', 'dvigatel', 'moshtnost', 'euro', 'skorosti', 'probeg'],
				sort: {
					price: 'updatedAt',
					direction: 'desc',
				},
				properties: {
					img: {
						type: 'string',
						description: "Image",
						components: {
							list: Components.CustomImage,
							show: Components.CustomImage
						},
					},
					title: {
						type: 'string',
						description: "Title and link to the announcement in the site",
						components: {
							list: Components.CustomTitle,
							show: Components.CustomTitle
						},
					},
				},
			},
		},
	],
	rootPath: '/admin'
}