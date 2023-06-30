import { memo, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { HStack } from '@/shared/components/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserInited, userActions } from '@/entities/User';
import { useSelector } from 'react-redux';

export const App = memo(() => {
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	return (
		<div className={'app'}>
			<Navbar />
			<HStack>
				<Sidebar />
				{inited && <AppRouter />}
			</HStack>
		</div>
	);
});
