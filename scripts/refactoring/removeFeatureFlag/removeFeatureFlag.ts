// npx ts-node ./scripts/refactoring/removeFeatureFlag/removeFeatureFlag.ts isArticleRatingEnabled on
import { Project, SyntaxKind } from 'ts-morph';
import { errorProcess } from './errorProcess';

const project = new Project({});
const removeFeatureName = process.argv[2];
const stateToggle = process.argv[3];

errorProcess(removeFeatureName, stateToggle);

project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.{ts,tsx}');
// project.addSourceFilesAtPaths('src/**/*.{ts,tsx}');
const sourceFiles = project.getSourceFiles();

sourceFiles.forEach((sourceFile) => {
	sourceFile.forEachDescendant((node) => {
		if (
			node.isKind(SyntaxKind.CallExpression) &&
			node.getExpression().getText() === 'toggleFeatures'
		) {
			const objectOptions = node.getFirstChildByKind(SyntaxKind.ObjectLiteralExpression);
			if (!objectOptions) return;

			const featureNameProperty = objectOptions.getProperty('name');
			const onFeatureProperty = objectOptions.getProperty('on');
			const offFeatureProperty = objectOptions.getProperty('off');

			const featureName = featureNameProperty
				?.getFirstChildByKind(SyntaxKind.StringLiteral)
				?.getLiteralValue();
			const onFeatureFunction = onFeatureProperty?.getFirstChildByKind(SyntaxKind.ArrowFunction);
			const offFeatureFunction = offFeatureProperty?.getFirstChildByKind(SyntaxKind.ArrowFunction);

			if (featureName !== removeFeatureName) return;

			if (stateToggle === 'on') {
				node.replaceWithText(onFeatureFunction?.getBodyText() ?? '');
			}

			if (stateToggle === 'off') {
				node.replaceWithText(offFeatureFunction?.getBodyText() ?? '');
			}
		}
	});
});

project.save();
