import { FC, lazy } from 'react';
import { EditableProfileCardHeaderProps } from './EditableProfileCardHeader';

const EditableProfileCardHeaderAsync = lazy<FC<EditableProfileCardHeaderProps>>(() =>
	import('./EditableProfileCardHeader').then((module) => ({
		default: module.EditableProfileCardHeader,
	}))
);

export { EditableProfileCardHeaderAsync as EditableProfileCardHeaderBeauty };
