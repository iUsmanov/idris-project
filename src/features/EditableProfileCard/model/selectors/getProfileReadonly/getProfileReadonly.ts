import { StateSchema } from '@/app/providers/StoreProvider';
// import { initialState } from '../../slice/profileSlice';

// export const getProfileReadonly = (state: StateSchema) => {
// 	// console.log(state.profile?.readonly);
// 	// ! KAKOGO CHORTA
// 	return state.profile?.readonly || initialState.readonly;
// };

export const getProfileReadonly = (state: StateSchema) => state.profile?.readonly;
