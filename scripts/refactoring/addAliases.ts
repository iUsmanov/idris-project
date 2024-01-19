/**
 * Допустим мы разрабатываем приложение и не используем алиасы в импортах.
 * Теперь мы хотим использовать алиасы, но ходить по всем файлам и добавлять
 * алиасы вручную - долго и нудно. А вот этот скрипт добавляет алиасы во все
 * нужные импорты во всех нужных файлах автоматически.
 *
 */
import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

function isAbsolute(value: string) {
	return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
	const importDeclarations = sourceFile.getImportDeclarations();
	importDeclarations.forEach((importDeclaration) => {
		const value = importDeclaration.getModuleSpecifierValue();
		if (isAbsolute(value)) {
			importDeclaration.setModuleSpecifier('@/' + value);
		}
	});
});

project.save();
