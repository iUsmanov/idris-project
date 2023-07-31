import { StoryFn } from '@storybook/react';
import { CSSProperties } from 'react';

const styles: CSSProperties = {
	minHeight: '100vh',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

export const CenteringDecorator = (Story: StoryFn) => {
	return (
		<section style={styles}>
			<Story />
		</section>
	);
};
