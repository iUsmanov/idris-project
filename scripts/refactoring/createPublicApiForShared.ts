/**
 * Этот скрипт создаёт PublicApi для компонентов Shared-слоя.
 *
 */

import path from 'path';
import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const sharedComponentsDirPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'components');
const sharedComponentsDir = project.getDirectory(sharedComponentsDirPath);
const componentsDirs = sharedComponentsDir?.getDirectories();

const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

function isAbsolute(value: string) {
	return layers.some((layer) => value.startsWith(layer));
}

componentsDirs?.forEach((directory) => {
	const indexFilePath = directory.getPath() + '/index.ts';
	const indexFile = directory.getSourceFile(indexFilePath);

	if (!indexFile) {
		const sourceCode = `export * from './${directory.getBaseName()}';
		`;
		const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });
		file.save();
	}
});

files.forEach((sourceFile) => {
	const importDeclarations = sourceFile.getImportDeclarations();
	importDeclarations.forEach((importDeclaration) => {
		const value = importDeclaration.getModuleSpecifierValue();
		const valueWithoutAlias = value.replace('@/', '');

		const segments = valueWithoutAlias.split('/');
		const isSharedLayer = segments?.[0] === 'shared';
		const isUIComponent = segments?.[1] === 'components';

		if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUIComponent) {
			const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
			importDeclaration.setModuleSpecifier('@/' + result);
		}
	});
});

project.save();
