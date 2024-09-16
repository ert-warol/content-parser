import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
	CustomImage: componentLoader.add('CustomImage', './components/CustomImage.jsx'),
	CustomLink: componentLoader.add('CustomLink', './components/CustomLink.jsx'),
}

export { componentLoader, Components }