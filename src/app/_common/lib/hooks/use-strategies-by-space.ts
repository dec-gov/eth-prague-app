import { useQuery } from "@tanstack/react-query";
import { Strategy, dummyStrategies } from "~/app/_common/types/strategies";

interface UseStrategiesBySpace {
	spaceId: number | undefined;
}

export function useStrategiesBySpace({ spaceId }: UseStrategiesBySpace) {
	return useQuery<Strategy[]>({
		queryKey: ["strategies-by-space", { spaceId }],
		queryFn: async () => {
			return dummyStrategies;
		},
		enabled: typeof spaceId === "number",
	});
}
