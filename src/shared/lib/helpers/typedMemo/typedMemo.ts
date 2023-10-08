import { memo } from 'react';

export const typedMemo: <T>(props: T) => T = memo;
