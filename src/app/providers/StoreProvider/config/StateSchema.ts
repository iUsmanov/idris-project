// #store
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { createReduxStore } from './store';
import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AxiosInstance } from 'axios';
import { ArticleCommentsListSchema } from '@/features/ArticleCommentsList';
import { AddNewCommentSchema } from '@/entities/AddNewComment';
import { UISchema } from '@/widgets/PageMainContent';
import { ArticlesSortSchema } from '@/features/ArticlesSort';
import { ArticlesTypeSchema } from '@/features/ArticleTypeTabs';
import { ArticlesSearchSchema } from '@/features/ArticlesSearch';
import { ProfileSchema } from '@/features/EditableProfileCard';
import { rtkApi } from '@/shared/api/rtkApi';
import { ArticlesInfiniteListSchema } from '@/widgets/articlesInfiniteList';
import { ArticleDetailsSchema } from '@/entities/Article';

/**
 * StateSchema описывает состояние нашего `store`.
 * */
export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	ui: UISchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

	// Async reducers
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
	articleDetails?: ArticleDetailsSchema;
	articleCommentsList?: ArticleCommentsListSchema;
	addNewComment?: AddNewCommentSchema;
	articlesInfiniteList?: ArticlesInfiniteListSchema;
	articlesSort?: ArticlesSortSchema;
	articlesType?: ArticlesTypeSchema;
	articlesSearch?: ArticlesSearchSchema;
}

/**
 * ReducerManager описывает методы нашего reducerManager.
 * */
export interface ReducerManager {
	getReducerMap: () => ReducersObject;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}
/**
 * ReduxStoreWithManager является типом нашего `store` и наделяет его reducerManager-ом.
 * */
export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
	reducerManager: ReducerManager;
}

/**
 * Тип ThunkExtraArg описывает extra-аргумент, который мы при конфигурации `store` прокидываем в каждый
 * `Thunk` и можем достать из `ThunkConfig` в наших `AsyncThunks`.
 * */
export interface ThunkExtraArg {
	api: AxiosInstance;
}

/**
 * Тип ThunkConfig описывает конфиг наших `AsyncThunks`.
 * */
export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}

/**
 * Тип AppDispatch описывает наш dispatch.
 * */
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

/**
 * Тип StateSchemaKey описывает, какие поля есть в нашем корневом стейт.
 * */
export type StateSchemaKey = keyof StateSchema;

/**
 * Тип ReducersObject описывает, какому полю в корневом стейте соответствует какой редюсер.
 * */
export type ReducersObject = ReducersMapObject<StateSchema, AnyAction>;
