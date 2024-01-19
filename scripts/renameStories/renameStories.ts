// npx ts-node ./scripts/renameStories/renameStories.ts

/**
 * Скрипт, который переименовывает стори-кейсы, добаляя к их названию
 * вариант дизайна - `Beauty` или `Matrix`.
 *
 * Например, стори-кейс имел название `PrimaryLightMatrix`,
 * теперь, когда мы добавляем дизайн `Beauty` в приложение,
 * у нас будет 2 стори-кейса один - `PrimaryLightMatrix`, другой - `PrimaryLightBeauty`.
 */

import { ExportedDeclarations, Project, SyntaxKind } from 'ts-morph';

const project = new Project({});

// project.addSourceFilesAtPaths('src/widgets/**/Navbar.stories.{ts,tsx}');
project.addSourceFilesAtPaths('src/widgets/**/*.stories.{ts,tsx}');
project.addSourceFilesAtPaths('src/features/**/*.stories.{ts,tsx}');
project.addSourceFilesAtPaths('src/entities/**/*.stories.{ts,tsx}');
project.addSourceFilesAtPaths('src/shared/**/*.stories.{ts,tsx}');

const renameByDesign = (exportedDeclarations: ExportedDeclarations[], design: string) => {
	exportedDeclarations.forEach((exportedDeclaration) => {
		const exportedDeclarationName = exportedDeclaration.getFirstChild();
		const exportedDeclarationNameText = exportedDeclarationName?.getText();
		if (exportedDeclarationNameText === 'meta') return;

		exportedDeclarationName?.replaceWithText(exportedDeclarationName.getText() + design);
	});
};

const sourceFiles = project.getSourceFiles();

sourceFiles.forEach((sourceFile) => {
	const exportedDeclarationsMap = sourceFile.getExportedDeclarations();
	const exportedDeclarations: ExportedDeclarations[] = [];
	const filePath = sourceFile.getFilePath();

	exportedDeclarationsMap.forEach((exportedDeclarationsTupple) => {
		exportedDeclarations.push(exportedDeclarationsTupple[0]);
	});

	if (filePath.includes('Beauty')) {
		renameByDesign(exportedDeclarations, 'Beauty');
	} else if (filePath.includes('Matrix')) {
		renameByDesign(exportedDeclarations, 'Matrix');
	}
});

project.save();
