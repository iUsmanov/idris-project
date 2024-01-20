// #featureFlags
import { FC, ReactElement } from 'react';
import { getFeatureFlag } from '../../lib/setGetFeatures';
import { FeatureFlags } from '../../model/types/featureFlags';

interface ToggleFeaturesProps {
	name: keyof FeatureFlags;
	on?: ReactElement;
	off?: ReactElement;
}

export const ToggleFeatures: FC<ToggleFeaturesProps> = (props) => {
	const { name, off, on } = props;

	if (getFeatureFlag(name) && on) {
		return on;
	}

	if (off) {
		return off;
	}

	return null;
};

/* 


import { FC, ReactElement } from 'react';
import { getFeatureFlag } from '../../lib/setGetFeatures';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface ToggleFeaturesProps {
	name: keyof FeatureFlags;
	on: ReactElement;
	off: ReactElement;
}

export const ToggleFeatures: FC<ToggleFeaturesProps> = (props) => {
	const { name, off, on } = props;

	if (getFeatureFlag(name)) {
		return on;
	}

	return off;
};

*/
