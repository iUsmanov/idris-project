import { FC, lazy } from 'react';
import { EditableProfileCardProps } from './EditableProfileCard';

const EditableProfileCardAsync = lazy<FC<EditableProfileCardProps>>(() =>
	import('./EditableProfileCard').then((module) => ({ default: module.EditableProfileCard }))
);

export { EditableProfileCardAsync as EditableProfileCardBeauty };
