import { FeatureFlags } from '@/shared/lib/featureFlags';
import { UserSettings } from './userSettings';

export interface User {
	id: string;
	username: string;
	avatar?: string;
	roles?: UserRole[];
	features?: FeatureFlags;
	jsonSettings?: UserSettings;
}

export interface UserSchema {
	authData?: User;
	_inited?: boolean;
}

export type UserRole = 'ADMIN' | 'MANAGER' | 'USER';
