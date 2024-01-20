// #featureFlags

/**
 * FeatureFlagsDecorator предназначен для того, чтобы определять состояния
 * фича-флагов в стори-кейсе. Это необходимо для того, чтобы навешивались определённые
 * классы и т.д.
 *
 *
 *
 * */

import { getFeatureFlag, setFeatureFlags } from '@/shared/lib/featureFlags';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { StoryContext, StoryFn } from '@storybook/react';

export const FeatureFlagsDecorator =
	(featureFlags: FeatureFlags) => (Story: StoryFn, context: StoryContext) => {
		setFeatureFlags({ ...featureFlags });
		const isBeautyDesign = getFeatureFlag('isBeautyDesign');

		return (
			<div className={isBeautyDesign ? 'beauty-design' : 'matrix-design'}>
				<Story />
			</div>
		);
	};
