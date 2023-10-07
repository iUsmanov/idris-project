// npx ts-node ./scripts/renameStories/renameStories.ts
import { log } from 'console';
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
