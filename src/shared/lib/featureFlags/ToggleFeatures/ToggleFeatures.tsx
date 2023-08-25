import { FC, ReactElement } from 'react';
import { getFeatureFlag } from '../setGetFeatures';
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
