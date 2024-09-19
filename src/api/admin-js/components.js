import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
	CustomImage: componentLoader.add('CustomImage', './components/CustomImage.jsx'),
	CustomTitle: componentLoader.add('CustomTitle', './components/CustomTitle.jsx'),
	ContentParserPage: componentLoader.add('ContentParserPage', './components/ContentParser.jsx'),
}

export { componentLoader, Components }