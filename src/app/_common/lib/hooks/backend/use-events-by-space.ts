import { useQuery } from '@tanstack/react-query'

import { Event, dummyEvents } from '~/app/_common/types/events'

interface UseEventsBySpace {
	spaceId: number | undefined
}

export function useEventsBySpace({ spaceId }: UseEventsBySpace) {
	return useQuery<Event[]>({
		queryKey: ['events-by-space', { spaceId }],
		queryFn: async () => {
			// const data = [] as unknown[];
			// return z.array(eventSchema).parse(data);
			return dummyEvents
		},
		enabled: typeof spaceId === 'number',
	})
}
