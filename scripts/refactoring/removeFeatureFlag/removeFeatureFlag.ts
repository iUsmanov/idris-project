// npm run remove-feature isArticleRatingEnabled on
import { Project, SyntaxKind } from 'ts-morph';
import { processError } from './processError';
import { processToggleFunction } from './processToggleFunction';
import { processToggleComponent } from './processToggleComponent';

const project = new Project({});
const removeFeatureName = process.argv[2];
const stateToggle = process.argv[3];

processError(removeFeatureName, stateToggle);

// project.addSourceFilesAtPaths('src/pages/ArticleDetailsPage/components/ArticleDetailsPage.tsx');
project.addSourceFilesAtPaths('src/**/*.{ts,tsx}');
const sourceFiles = project.getSourceFiles();

sourceFiles.forEach((sourceFile) => {
	sourceFile.forEachDescendant((node) => {
		if (
			node.isKind(SyntaxKind.CallExpression) &&
			node.getExpression().getText() === 'toggleFeatures'
		) {
			processToggleFunction(node, removeFeatureName, stateToggle);
		} else if (
			node.isKind(SyntaxKind.JsxSelfClosingElement) &&
			node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() === 'ToggleFeatures'
		) {
			processToggleComponent(node, removeFeatureName, stateToggle);
		}
	});
});

project.save();
