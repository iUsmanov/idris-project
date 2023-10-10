import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddNewComment.module.scss';
import { HStack } from '@/shared/components/Stack';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { Text } from '@/shared/components/Text';
import { useAddNewComment } from '../../../lib/hooks/useAddNewComment';
import { Card } from '@/shared/components/Card';

export interface AddNewCommentProps {
	className?: string;
	sendNewComment: (text: string) => void;
	isLoading?: boolean;
	error?: string;
}

export const AddNewComment = memo((props: AddNewCommentProps) => {
	const { className, sendNewComment, error, isLoading } = props;
	const { t } = useTranslation(['article-details', 'translation']);
	const { onChangeText, onSendNewComment, text } = useAddNewComment(sendNewComment);

	return (
		<Card padding='24' border='high' max>
			{error && <Text variant='error' title={t('Произошла непредвиденная ошибка')} />}
			<HStack
				max
				gap='16'
				justify='between'
				align='center'
				className={classNames('', {}, [className])}
			>
				<Input
					className={cls.input}
					placeholder={t('Введите текст комментария')}
					value={text}
					onChange={onChangeText}
					disabled={isLoading}
				/>
				<Button variant='outline' onClick={onSendNewComment} disabled={isLoading}>
					{t('Отправить')}
				</Button>
			</HStack>
		</Card>
	);
});

/* 

После прохождения курса надо:

1.Toolbar and articleViewSelector are not fixed.
2. Есть ли баги
3. Фикс бага с беск. скроллом.
4. Сделать buildSelector с реселект, а также биндер для асинк санков. 105 урок. В комментах есть хорошие предложения.
5. Написать jest-тесты.

6. Написать сторисы и использовать для запросов в сторибуке аддон.
7. Скриншотные тесты. 109-110 урок - генерация отчетов для тестов, апгрейд yaml файла.
8. Animation wrapper for loki.


9. Добавить преттиер в линт-стэйджед. Урок 117.
10.Оптимизировать работу с фича флагами
11. Понять анимацию дровера
12. Асинк для шрифтов и ксс переменных.
13. Дописать линтер
*/
