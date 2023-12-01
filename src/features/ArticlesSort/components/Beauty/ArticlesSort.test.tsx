import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticlesSort } from './ArticlesSort';
import { screen } from '@testing-library/react';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

const onChangeOrder = jest.fn();
const onChangeSort = jest.fn();

describe('ArticlesSort.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('Component is rendered', async () => {
		await componentRender(
			<ArticlesSort onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />,
			{
				wrapInAct: true,
			}
		);

		expect(screen.getByTestId('ArticlesSort')).toBeInTheDocument();
		expect(screen.getByTestId('SortField')).toBeInTheDocument();
		expect(screen.getByTestId('SortOrder')).toBeInTheDocument();
	});
});
// Так как, опции Лисбокса не отображаются, Мы не можем протестировать случаи связанные с нажатиями на них
