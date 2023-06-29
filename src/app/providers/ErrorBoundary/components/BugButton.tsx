import { memo, useEffect, useState } from 'react';
import { Button } from '@/shared/components/Button/Button';

export const BugButton = memo(() => {
	const [error, setError] = useState<boolean>(false);

	const onThrow = () => setError(true);

	useEffect(() => {
		if (error) {
			throw new Error();
		}
	}, [error]);

	return <Button onClick={onThrow}>ERROR</Button>;
});
