import { memo, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { HStack } from '@/shared/components/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from '@/entities/User';

export const App = memo(() => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);
	return (
		<div className={'app'}>
			<Navbar />
			<HStack>
				<Sidebar />
				<AppRouter />
			</HStack>
		</div>
	);
});
