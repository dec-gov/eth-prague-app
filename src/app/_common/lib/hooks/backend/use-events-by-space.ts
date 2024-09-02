import { useQuery } from '@tanstack/react-query'

import { decgov_backend } from '../../declarations'

interface UseEventsBySpace {
	spaceId: number | undefined
}

export function useEventsBySpace({ spaceId }: UseEventsBySpace) {
	return useQuery({
		queryKey: ['events-by-space', { spaceId }],
		queryFn: async () => {
			if (typeof spaceId !== 'number') {
				throw new Error('Invalid spaceId')
			}

			const data = await decgov_backend.get_events_by_space(spaceId)

			const events = data[0]

			if (!events) {
				throw new Error('Fetch events by proposal failed')
			}

			return events
		},
		enabled: typeof spaceId === 'number',
	})
}
