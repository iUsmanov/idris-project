import { StateSchema } from '@/app/providers/StoreProvider';
import { ThunkExtraArg } from '@/app/providers/StoreProvider/config/StateSchema';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosStatic } from 'axios';

type Thunk<Return, Arg, RejectedValue> = (
	arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
	thunk: Thunk<Return, Arg, RejectedValue>;
	dispatch: jest.MockedFn<any>;
	getState: () => StateSchema;
	extra: ThunkExtraArg;
	api: jest.MockedFunctionDeep<AxiosStatic>;

	constructor(thunk: Thunk<Return, Arg, RejectedValue>, state?: DeepPartial<StateSchema>) {
		this.thunk = thunk;
		this.dispatch = jest.fn();
		this.getState = jest.fn(() => state as StateSchema);
		this.api = mockedAxios;
		this.extra = {
			api: this.api,
		};
	}

	async callThunk(arg: Arg) {
		const asyncThunkAction = this.thunk(arg);
		const action = await asyncThunkAction(this.dispatch, this.getState, this.extra);

		return action;
	}
}
