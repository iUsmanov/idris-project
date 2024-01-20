// #featureFlags
import { FeatureFlags } from '../model/types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

interface ToggleFeaturesOptions {
	name: keyof FeatureFlags;
	on?: () => any;
	off?: () => any;
}

export function toggleFeatures({ name, on, off }: ToggleFeaturesOptions) {
	if (getFeatureFlag(name) && on) {
		return on();
	}

	if (off) {
		return off();
	}
}

/* 


import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

interface ToggleFeaturesOptions<T> {
	name: keyof FeatureFlags;
	on: () => T;
	off: () => T;
}

export function toggleFeatures<T>({ name, on, off }: ToggleFeaturesOptions<T>): T {
	if (getFeatureFlag(name)) {
		return on();
	}

	return off();
}


*/
