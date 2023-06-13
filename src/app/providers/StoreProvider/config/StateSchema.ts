import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { createReduxStore } from './store';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;

	// Async reducers
	loginForm?: LoginSchema;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export type StateSchemaKey = keyof StateSchema;
