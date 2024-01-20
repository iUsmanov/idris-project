### Storybook

В проекте для каждого компонента описываются стори-кейсы.
Файл со стори-кейсами создается рядом с компонентом с расширением .stories.ts(x)

Пример:

```typescript jsx
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		children: 'Button',
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalLightBeauty: Story = {
	args: {},
	decorators: [],
};

export const NormalDarkBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const NormalOrangeBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
```

#### Конфигурация

Конфигурация Storybook находится в текущей директории.

В файле [preview.tsx](/config/storybook/preview.tsx), подключаются мои декораторы и
определяются кнопки в интерфейсе сторибук, при нажатии на которых будут меняться язык
и тема.

Из основного файла конфигурации [main.ts](/config/storybook/main.ts) экпортируется
webpack-конфиг для сборки сторибука. В поле `webpackFinal` этого конфига мы можем переопределять
и дополнять конфиг.

---

#### Декораторы

Декораторы представляют собой обёртки для React-компонентов, которые дают дополнительный функционал.
Декораторы расположены вот [здесь](/src/shared/config/storybook). Документация для каждого
декоратора написана прямо в его файле. Некоторые декораторы могут принимать аргументы. В файле
[preview.tsx](/config/storybook/preview.tsx) большинство декораторов уже объявлено, и те, которые
могут принимать аргументы объявлены с аргументами по умолчанию. Если же мы хотим переопределить эти
аргументы по умолчанию, то можем объявить эти декораторы для группы стори-кейсов. Вот так:

```typescript jsx
import { Meta, StoryObj } from '@storybook/react';
import { CommentsList } from './CommentsList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockComments } from '../../mocks';

const meta = {
	title: 'entities/CommentsList',
	component: CommentsList,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
} satisfies Meta<typeof CommentsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
	args: {
		comments: mockComments,
	},
};

export const LoadingDark: Story = {
	args: {
		isLoading: true,
	},
};

export const ErrorOrange: Story = {
	args: {
		error: 'error',
	},
};
```

Или мы можем переопределить эти декораторы для конкретного стори-кейса. Вот так:

```typescript jsx
export const LoadingDark: Story = {
	args: {
		isLoading: true,
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};
```

#### Запросы на сервер

В компонентах у нас могут отправляться запросы на сервер, но в стори-кейсах, мы не хотим,
чтобы они у нас отправлялись. В таком случае, мы их замокаем с помощью `storybook-addon-mock`.
Все моковые запросы вот [здесь](src/shared/mocks/storybook/requests.ts).

Используются моковые запросы вот так:

```typescript jsx
import { Meta, StoryObj } from '@storybook/react';
import { NotificationsList } from './NotificationsList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockStorybookGetNotificationsSuccess } from '@/shared/mocks/storybook/requests';

const meta = {
	title: 'entities/NotificationsList',
	component: NotificationsList,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	parameters: {
		mockData: [mockStorybookGetNotificationsSuccess],
	},
} satisfies Meta<typeof NotificationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
	args: {},
	decorators: [],
};
```
