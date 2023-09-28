import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider/testing';
import { addNewCommentReducer } from '@/entities/AddNewComment/testing';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { articleCommentsListReducer } from '@/features/ArticleCommentsList/testing';
import { articlesTypeReducer } from '@/features/ArticleTypeTabs/testing';
import { articlesSearchReducer } from '@/features/ArticlesSearch/testing';
import { articlesSortReducer } from '@/features/ArticlesSort/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';
import { ReducersList } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { articlesInfiniteListReducer } from '@/widgets/articlesInfiniteList/testing';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StoryFn } from '@storybook/react';

// const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	articleCommentsList: articleCommentsListReducer,
	addNewComment: addNewCommentReducer,
	articlesInfiniteList: articlesInfiniteListReducer,
	articlesSort: articlesSortReducer,
	articlesType: articlesTypeReducer,
	articlesSearch: articlesSearchReducer,
};

export const StoreDecorator =
	(state?: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (Story: StoryFn) => {
		return (
			<StoreProvider
				initialState={state as StateSchema}
				asyncReducers={
					{ ...defaultAsyncReducers, ...asyncReducers } as ReducersMapObject<StateSchema>
				}
			>
				<Story />
			</StoreProvider>
		);
	};
