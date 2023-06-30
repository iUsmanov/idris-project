import { getUserAuthData } from '@/entities/User';
import { getRouteMain } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
	children: JSX.Element;
}

export const RequireAuth = (props: RequireAuthProps) => {
	const { children } = props;

	const isAuth = useSelector(getUserAuthData);
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
	}

	return children;
};
