// npx ts-node ./scripts/createBeautyStructure/createBeautyStructure.ts
import { log } from 'console';
import { Project, SyntaxKind } from 'ts-morph';
import { mainFileText } from './filesStructures/mainFileText';
import { storyFileText } from './filesStructures/storyFileText';
import { asyncFileText } from './filesStructures/asyncFileText';
import { scssFileText } from './filesStructures/scssFileText';
import path from 'path';

const srcDirPath = path.join(__dirname, '..', '..', 'src');

const project = new Project({});

project.addSourceFilesAtPaths('src/widgets/**/*.{ts,tsx}');
project.addSourceFilesAtPaths('src/features/**/*.{ts,tsx}');
project.addSourceFilesAtPaths('src/entities/**/*.{ts,tsx}');

const sourceFiles = project.getSourceFiles();

sourceFiles.forEach((sourceFile) => {
	const sourceFileName = sourceFile.getBaseNameWithoutExtension();
	if (!sourceFile.getFilePath().includes('components')) return;
	if (sourceFileName.includes('.')) return;

	const sourceFileDirectory = sourceFile.getDirectory();

	const nearFiles = sourceFileDirectory.getSourceFiles();

	let hasStory = false;
	nearFiles.forEach((nearFile) => {
		if (hasStory) return;
		if (nearFile.getBaseNameWithoutExtension().endsWith('.stories')) {
			hasStory = true;
		}
	});
	if (!hasStory) return;

	const createdDir = sourceFileDirectory.createDirectory('Beauty');

	let layer = '';
	const sourceFileDirPath = sourceFileDirectory.getPath();

	if (sourceFileDirPath.includes('widgets')) {
		layer = 'widgets';
	}
	if (sourceFileDirPath.includes('features')) {
		layer = 'features';
	}
	if (sourceFileDirPath.includes('entities')) {
		layer = 'entities';
	}

	createdDir.createSourceFile(`${sourceFileName}.tsx`, mainFileText(sourceFileName));
	createdDir.createSourceFile(`${sourceFileName}.test.tsx`, ``);
	createdDir.createSourceFile(`${sourceFileName}.stories.ts`, storyFileText(sourceFileName, layer));
	const createdAsyncFile = createdDir.createSourceFile(
		`${sourceFileName}.async.tsx`,
		asyncFileText(sourceFileName)
	);
	createdDir.createSourceFile(`${sourceFileName}.module.scss`, scssFileText(sourceFileName));

	const sourceFileDirectoryPath = sourceFileDirectory.getPath();
	const sliceDirPath = sourceFileDirectoryPath.split('/').slice(0, 8).join('/'); /*  + '/index.ts' */
	const sliceDir = project.getDirectory(sliceDirPath);
	const indexFilePath = sliceDirPath + '/index.ts';
	const indexFile = sliceDir?.getSourceFile(indexFilePath);

	indexFile?.addExportDeclaration({
		namedExports: (writer) =>
			writer.writeLine(
				`export { ${sourceFileName}Async as ${sourceFileName}Beauty } from '${createdAsyncFile.getRelativePathTo(
					createdAsyncFile
				)}'`
			),
	});
});

project.save();
