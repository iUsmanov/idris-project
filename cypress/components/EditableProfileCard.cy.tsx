import { DeepPartial } from '@reduxjs/toolkit';
import { EditableProfileCard } from 'C:/Users/PC95/Desktop/frontend/idris-project/src/features/EditableProfileCard';
import {
	ReducersObject,
	StateSchema,
} from 'C:/Users/PC95/Desktop/frontend/idris-project/src/app/providers/StoreProvider/testing';
import { profileReducer } from 'C:/Users/PC95/Desktop/frontend/idris-project/src/features/EditableProfileCard/model/slice/profileSlice';

const userId = '1';
// Почему-то типы подхватываются несмотря на то, что мы...
describe('EditableProfileCard.cy.tsx', () => {
	it('Компонент отрисовывается', () => {
		const initialState: DeepPartial<StateSchema> = {
			user: {
				authData: {
					id: userId,
				},
			},
		};
		const asyncReducers: DeepPartial<ReducersObject> = {
			profile: profileReducer,
		};
		cy.intercept('GET', '**/profiles/*', { fixture: 'profile.json' });
		// cy.mount(
		// 	<TestProvider options={{ initialState, asyncReducers }}>
		// 		<EditableProfileCard id={userId} />
		// 	</TestProvider>
		// );
		// or
		cy.render(<EditableProfileCard id={userId} />, { initialState, asyncReducers });
	});
});
