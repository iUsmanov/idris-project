import { FeatureFlags } from '@/shared/types/featureFlags';
import { getAllFeatureFlags, getFeatureFlag, setFeatureFlags } from './setGetFeatures';

describe('setGetFeatures.test', () => {
	test('setFeatureFlags and getFeatureFlag', () => {
		setFeatureFlags({ isBeautyDesign: true });
		const isBeautyDesign = getFeatureFlag('isBeautyDesign');

		expect(isBeautyDesign).toBe(true);
	});
	// ======================
	test('setFeatureFlags and allFeatureFlags', () => {
		const featureFlags: FeatureFlags = {
			isBeautyDesign: true,
			isArticleRatingEnabled: false,
		};
		setFeatureFlags(featureFlags);
		const allFeatureFlags = getAllFeatureFlags();

		expect(allFeatureFlags).toEqual(featureFlags);
	});
	// ====================
	test('При вызове setFeatureFlags с undefined-аргументом, фича-алаги не должны измениться', () => {
		const featureFlags: FeatureFlags = {
			isBeautyDesign: true,
			isArticleRatingEnabled: false,
		};
		setFeatureFlags(featureFlags);
		setFeatureFlags();
		const allFeatureFlags = getAllFeatureFlags();

		expect(allFeatureFlags).toEqual(featureFlags);
	});
	test('При вызове setFeatureFlags с аргументом-пустым объектом, фича-флаги должны обнулиться', () => {
		setFeatureFlags({});
		const allFeatureFlags = getAllFeatureFlags();

		expect(allFeatureFlags).toEqual({});
	});
});
