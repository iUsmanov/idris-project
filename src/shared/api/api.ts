import axios from 'axios';
import { LOCAL_STORAGE_USER_KEY } from '../const/localStorage';

export const $api = axios.create({
	baseURL: __API__,
	headers: {
		// strict-mode-ts doesn't angry
		authorization: localStorage.getItem(LOCAL_STORAGE_USER_KEY) || '',
	},
});
