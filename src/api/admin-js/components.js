import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
	CustomImage: componentLoader.add('CustomImage', './components/CustomImage.jsx')
}

export { componentLoader, Components }