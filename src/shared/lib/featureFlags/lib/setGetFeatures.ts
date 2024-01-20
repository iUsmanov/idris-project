// #featureFlags
import { LOCAL_STORAGE_APP_DESIGN_KEY } from '@/shared/const/localStorage';
import { FeatureFlags } from '../model/types/featureFlags';

const defaultFeatureFlags: FeatureFlags = {
	isBeautyDesign: localStorage.getItem(LOCAL_STORAGE_APP_DESIGN_KEY) === 'beauty-design',
};

let featureFlags: FeatureFlags = {
	...defaultFeatureFlags,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
	if (newFeatureFlags) {
		featureFlags = newFeatureFlags;
	}
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
	return featureFlags[flag];
}

export function getAllFeatureFlags() {
	return featureFlags;
}
