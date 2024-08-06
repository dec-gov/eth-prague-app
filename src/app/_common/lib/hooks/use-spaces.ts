import { useQuery } from "@tanstack/react-query";

import { Space, dummySpaces } from "~/app/_common/types/spaces";

export function useSpaces() {
	return useQuery<Space[]>({
		queryKey: ["spaces"],
		queryFn: async () => {
			// const data = [] as unknown[]
			// return z.array(spaceSchema).parse(data)
			return dummySpaces;
		},
	});
}
