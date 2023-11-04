import { toggleFeatures } from './toggleFeatures';
import { setFeatureFlags } from './setGetFeatures';

describe('ToggleFeatures.test', () => {
	test('Selected beauty design', () => {
		setFeatureFlags({ isBeautyDesign: true });
		const design = toggleFeatures({
			name: 'isBeautyDesign',
			on: () => 'beauty',
			off: () => 'matrix',
		});

		expect(design).toBe('beauty');
	});
	test('Selected matrix design', () => {
		setFeatureFlags({ isBeautyDesign: false });
		const design = toggleFeatures({
			name: 'isBeautyDesign',
			on: () => 'beauty',
			off: () => 'matrix',
		});

		expect(design).toBe('matrix');
	});
	// ==============
	// ==============
	test('Selected beauty design', () => {
		setFeatureFlags({ isBeautyDesign: true });
		const design = toggleFeatures({
			name: 'isBeautyDesign',
			on: () => 'beauty',
		});

		expect(design).toBe('beauty');
	});
	test('Selected matrix design', () => {
		setFeatureFlags({ isBeautyDesign: false });
		const design = toggleFeatures({
			name: 'isBeautyDesign',
			off: () => 'matrix',
		});

		expect(design).toBe('matrix');
	});
});
