import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/components/Card';
import { HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { StarRating } from '@/shared/components/StarRating';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Button } from '@/shared/components/Button';
import { DesktopView, MobileView } from '@/shared/components/DeviceViews';
import { Drawer } from '@/shared/components/Drawer';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/featureFlags';

interface RatingCardProps {
	className?: string;
	title?: string;
	feedbackTitle?: string;
	hasFeedback?: boolean;
	onCancel?: (starsCount: number) => void;
	onAccept?: (starsCount: number, feedback?: string) => void;
	rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
	const { className, feedbackTitle, hasFeedback, onAccept, onCancel, title, rate = 0 } = props;
	const [starsCount, setStarsCount] = useState(rate);
	const [feedback, setFeedback] = useState<string>('');
	const { t } = useTranslation('article-details');
	const {
		isMounted,
		isOpened,
		onMountAndOpen: onOpenModal,
		onUnmountAndClose: onCloseModal,
	} = useModal();

	const onSelectStars = useCallback(
		(selectedStarsCount: number) => {
			setStarsCount(selectedStarsCount);
			if (hasFeedback) {
				onOpenModal();
			} else {
				onAccept?.(selectedStarsCount);
			}
		},
		[hasFeedback, onAccept, onOpenModal]
	);

	const acceptHandler = useCallback(() => {
		onCloseModal();
		onAccept?.(starsCount, feedback);
	}, [feedback, onAccept, onCloseModal, starsCount]);

	const cancelHandler = useCallback(() => {
		onCloseModal();
		onCancel?.(starsCount);
	}, [onCancel, onCloseModal, starsCount]);

	const modalContent = (
		<>
			<Text title={feedbackTitle} />
			<Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
		</>
	);

	const content = (
		<>
			<VStack align='center' gap='8'>
				<Text title={starsCount ? t('Спасибо за оценку!') : title} />
				<StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
			</VStack>
			<DesktopView>
				<Modal
					container={document.body}
					isMounted={isMounted}
					isOpened={isOpened}
					onModalClose={onCloseModal}
				>
					<VStack gap='32' max>
						{modalContent}
						<HStack max gap='16' justify='right'>
							<Button
								variant={toggleFeatures({
									name: 'isBeautyDesign',
									on: () => 'outline',
									off: () => 'outlineRed',
								})}
								color={toggleFeatures({
									name: 'isBeautyDesign',
									on: () => 'error',
									off: () => undefined,
								})}
								onClick={cancelHandler}
							>
								{t('Закрыть')}
							</Button>
							<Button variant='outline' onClick={acceptHandler}>
								{t('Отправить')}
							</Button>
						</HStack>
					</VStack>
				</Modal>
			</DesktopView>
			<MobileView>
				<Drawer
					container={document.body}
					isMounted={isMounted}
					isOpened={isOpened}
					onDrawerClose={onCloseModal}
				>
					<VStack gap='32'>
						{modalContent}
						<Button fullWidth variant='outline' onClick={acceptHandler} size='size_l'>
							{t('Отправить')}
						</Button>
					</VStack>
				</Drawer>
			</MobileView>
		</>
	);

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={
				<Card border='high' padding='24' className={classNames('', {}, [className])} max>
					{content}
				</Card>
			}
			off={
				<Card className={classNames('', {}, [className])} max>
					{content}
				</Card>
			}
		/>
	);
});
