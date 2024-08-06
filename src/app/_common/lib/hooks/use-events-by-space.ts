import { useQuery } from "@tanstack/react-query";

import { Event, dummyEvents } from "~/app/_common/types/events";

export function useEventsBySpace(_spaceId: number | string | null | undefined) {
	const spaceId =
		_spaceId !== null && _spaceId !== undefined ? Number(_spaceId) : null;

	return useQuery<Event[]>({
		queryKey: ["events-by-space", spaceId],
		queryFn: async () => {
			// const data = [] as unknown[];
			// return z.array(eventSchema).parse(data);
			return dummyEvents;
		},
		enabled: typeof spaceId === "number",
	});
}
