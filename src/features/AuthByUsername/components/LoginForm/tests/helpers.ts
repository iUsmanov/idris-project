export function getAction(status: 'fulfilled' | 'rejected' | 'pending'): object {
	return {
		meta: {
			requestStatus: status,
		},
	};
}
