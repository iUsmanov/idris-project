// ! Этот файл вышел из употребления!
import { Node, Project, SyntaxKind } from 'ts-morph';

const removeFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removeFeatureName) {
	throw new Error('Incorrect feature name');
}

if (featureState !== 'on' && featureState !== 'off') {
	throw new Error('Incorrect feature state');
}

const project = new Project({});

// project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
	let isToggleFeatures = false;
	node.forEachChild((child) => {
		if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
			isToggleFeatures = true;
		}
	});

	return isToggleFeatures;
};

files.forEach((sourceFile) => {
	sourceFile.forEachDescendant((node) => {
		if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
			const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

			if (!objectOptions) return;

			const featureNameProperty = objectOptions.getProperty('name');
			const onFunctionProperty = objectOptions.getProperty('on');
			const offFunctionProperty = objectOptions.getProperty('off');

			const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
			const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
			const featureName = featureNameProperty
				?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
				?.getText()
				.slice(1, -1);

			if (featureName !== removeFeatureName) return;

			if (featureState === 'on') {
				node.replaceWithText(onFunction?.getBody().getText() ?? '');
			}

			if (featureState === 'off') {
				node.replaceWithText(offFunction?.getBody().getText() ?? '');
			}
		}
	});
});

project.save();
