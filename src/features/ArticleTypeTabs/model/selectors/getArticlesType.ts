import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice/articlesTypeSlice';

export const getArticlesType = (state: StateSchema) => state.articlesType?.type ?? initialState.type;
