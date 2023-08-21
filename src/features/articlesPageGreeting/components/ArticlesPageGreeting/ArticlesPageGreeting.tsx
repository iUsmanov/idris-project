import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DesktopView, MobileView } from '@/shared/components/DeviceViews';
import { Modal } from '@/shared/components/Modal';
import { Drawer } from '@/shared/components/Drawer';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Text } from '@/shared/components/Text';
import { saveUserSettings, useUserSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const ArticlesPageGreeting = memo(() => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { isArticlesPageWasOpened } = useUserSettings();
	const { isMounted, isOpened, onMountAndOpen, onUnmountAndClose } = useModal();

	useEffect(() => {
		if (!isArticlesPageWasOpened) {
			onMountAndOpen();
			dispatch(saveUserSettings({ isArticlesPageWasOpened: true }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const content = (
		<Text
			title={t('Добро пожаловать на страницу статей!')}
			text={t('Здесь можно смотреть статьи на различные темы')}
		/>
	);

	return (
		<>
			<DesktopView>
				<Modal
					container={document.body}
					isMounted={isMounted}
					isOpened={isOpened}
					onModalClose={onUnmountAndClose}
				>
					{content}
				</Modal>
			</DesktopView>
			<MobileView>
				<Drawer
					container={document.body}
					isMounted={isMounted}
					isOpened={isOpened}
					onDrawerClose={onUnmountAndClose}
				>
					{content}
				</Drawer>
			</MobileView>
		</>
	);
});
