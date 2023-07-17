import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { createReduxStore } from './store';
import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AxiosInstance } from 'axios';
import { ProfileSchema } from '@/features/Profile';
import { ArticleDetailsSchema } from '@/entities/Article';
import { ArticleCommentsListSchema } from '@/features/ArticleCommentsList';
import { AddNewCommentSchema } from '@/entities/AddNewComment';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { UISchema } from '@/widgets/Page';
import { ArticlesSortSchema } from '@/features/ArticlesSort';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	ui: UISchema;

	// Async reducers
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
	articleDetails?: ArticleDetailsSchema;
	articleCommentsList?: ArticleCommentsListSchema;
	addNewComment?: AddNewCommentSchema;
	articlesPage?: ArticlesPageSchema;
	articlesSort?: ArticlesSortSchema;
}

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema, AnyAction>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export type StateSchemaKey = keyof StateSchema;
