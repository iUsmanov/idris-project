import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/userSlice';

export const getUserInited = (state: StateSchema) => state.user._inited || initialState._inited;
