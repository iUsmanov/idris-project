import { Node, SyntaxKind } from 'ts-morph';

export function processToggleComponent(node: Node, removeFeatureName: string, stateToggle: string) {
	const attributes = node.getFirstChildByKind(SyntaxKind.JsxAttributes);

	let cancel: boolean = false;

	attributes?.forEachChild((attribute) => {
		const featureName = attribute?.getFirstChildByKind(SyntaxKind.StringLiteral)?.getLiteralValue();
		if (!featureName) return;

		if (featureName !== removeFeatureName) {
			const nameAttribute = attribute?.getFirstChildByKind(SyntaxKind.Identifier)?.getText();
			if (nameAttribute === 'name') {
				cancel = true;
			}
		}
	});

	if (cancel) return;

	let replaceExpression;

	attributes?.forEachChild((attribute) => {
		const attributeName = attribute.getFirstChild()?.getText();
		const attributeInner = attribute.getLastChild()?.getText().slice(1, -1);

		if (attributeName === stateToggle) {
			if (attributeInner?.startsWith('(')) {
				replaceExpression = attributeInner.slice(1, -1);
			} else {
				replaceExpression = attributeInner;
			}
		}
	});

	node.replaceWithText(replaceExpression ?? '');
}
