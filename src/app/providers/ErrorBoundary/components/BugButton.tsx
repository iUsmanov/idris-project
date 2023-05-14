import { FC, useEffect, useState } from 'react';
import { Button } from '@/shared/components/Button/Button';

interface BugButtonProps {
	className?: string;
}

export const BugButton: FC<BugButtonProps> = (props) => {
	const { className } = props;

	const [error, setError] = useState<boolean>(false);

	const onThrow = () => setError(true);

	useEffect(() => {
		if (error) {
			throw new Error();
		}
	}, [error]);

	return <Button onClick={onThrow}>ERROR</Button>;
};
