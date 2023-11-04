import { screen } from '@testing-library/react';
import { ToggleFeatures } from './ToggleFeatures';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { setFeatureFlags } from '../../lib/setGetFeatures';

const beauty = <div data-testid='beauty'>beauty</div>;

const matrix = <div data-testid='matrix'>matrix</div>;

describe('ToggleFeatures.test', () => {
	test('Selected beauty design', () => {
		setFeatureFlags({ isBeautyDesign: true });
		componentRender(<ToggleFeatures name='isBeautyDesign' on={beauty} off={matrix} />);
		expect(screen.getByTestId('beauty')).toBeInTheDocument();
		expect(screen.queryByTestId('matrix')).not.toBeInTheDocument();
	});
	test('Selected matrix design', () => {
		setFeatureFlags({ isBeautyDesign: false });
		componentRender(<ToggleFeatures name='isBeautyDesign' on={beauty} off={matrix} />);
		expect(screen.getByTestId('matrix')).toBeInTheDocument();
		expect(screen.queryByTestId('beauty')).not.toBeInTheDocument();
	});
	// ================
	// ================
	test('Selected beauty design', () => {
		setFeatureFlags({ isBeautyDesign: true });
		componentRender(<ToggleFeatures name='isBeautyDesign' on={beauty} />);
		expect(screen.getByTestId('beauty')).toBeInTheDocument();
		expect(screen.queryByTestId('matrix')).not.toBeInTheDocument();
	});
	test('Selected matrix design', () => {
		setFeatureFlags({ isBeautyDesign: false });
		componentRender(<ToggleFeatures name='isBeautyDesign' off={matrix} />);
		expect(screen.getByTestId('matrix')).toBeInTheDocument();
		expect(screen.queryByTestId('beauty')).not.toBeInTheDocument();
	});
});
