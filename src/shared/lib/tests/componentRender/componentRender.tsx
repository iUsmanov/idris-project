import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider/testing';

export interface ComponentRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
}

export const componentRender = (component: ReactNode, options: ComponentRenderOptions = {}) => {
	const { route = '/', initialState } = options;
	return render(
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider initialState={initialState as StateSchema}>
				<I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
			</StoreProvider>
		</MemoryRouter>
	);
};
