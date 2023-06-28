import { StateSchema } from '@/app/providers/StoreProvider';
import { ThunkExtraArg } from '@/app/providers/StoreProvider/config/StateSchema';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosStatic } from 'axios';

type ActionCreator<Return, Arg, RejectedValue> = (
	arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>;
	getState: () => StateSchema;
	actionCreator: ActionCreator<Return, Arg, RejectedValue>;
	extra: ThunkExtraArg;
	api: jest.MockedFunctionDeep<AxiosStatic>;

	constructor(actionCreator: ActionCreator<Return, Arg, RejectedValue>) {
		this.actionCreator = actionCreator;
		this.dispatch = jest.fn();
		this.getState = jest.fn();
		this.api = mockedAxios;
		this.extra = {
			api: this.api,
		};
	}

	async callThunk(arg: Arg) {
		const actionCreator = this.actionCreator(arg);
		const action = await actionCreator(this.dispatch, this.getState, this.extra);

		return action;
	}
}
