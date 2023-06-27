export interface Profile {
	id: string;
	first: string;
	lastname: string;
	age: number;
	currency: Currency;
	country: Country;
	city: string;
	username: string;
	avatar: string;
}

export interface ProfileSchema {
	data?: Profile;
	isLoading: boolean;
	error?: string;
	readonly?: boolean;
}

export type Currency = 'RUB' | 'EUR' | 'USD';
export type Country = 'Russia' | 'Belarus' | 'Ukraine' | 'Kazakhstan' | 'Armenia';
