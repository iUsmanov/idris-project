import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { profileReducer } from '@/entities/Profile';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { StoryFn } from '@storybook/react';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	loginForm: loginReducer,
	profile: profileReducer,
};

export const StoreDecorator =
	(state?: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) =>
	(Story: StoryFn) => {
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
