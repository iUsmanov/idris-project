import { PageError } from '@/widgets/PageError';
import { Component, ErrorInfo, ReactNode } from 'react';
import { /* WithTranslation, */ withTranslation } from 'react-i18next';

interface ErrorBoundaryProps {
	children?: ReactNode;
	// i18n: WithTranslation;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	public state: ErrorBoundaryState = {
		hasError: false,
	};

	public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		// const { t } = this.props.i18n;
		const hasError = this.state.hasError;
		const children = this.props.children;

		if (hasError) {
			return <PageError />;
		}

		return children;
	}
}

export default withTranslation()(ErrorBoundary);
// export const ErrorBoundary = withTranslation()(ErrBoundary);
