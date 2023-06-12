import { FC, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { HStack } from '@/shared/components/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from '@/entities/User';
interface AppProps {}

export const App: FC<AppProps> = (props) => {
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
};
