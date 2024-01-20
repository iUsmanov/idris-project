/**
 * StyleDecorator предназначен для того, чтобы в стори-кейсе были определены
 * глобальные стили, за которые ответственен файл - index.scss.
 *
 * */

import { StoryFn } from '@storybook/react';
// eslint-disable-next-line fsd-paths-guard/public-api-imports, fsd-paths-guard/hierarchy-imports-between-layers
import '@/app/styles/index.scss';

export const StyleDecorator = (Story: StoryFn) => <Story />;
