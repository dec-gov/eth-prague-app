import { useQuery } from "@tanstack/react-query";
import { Space, dummySpaces } from "~/app/_common/types/spaces";

export function useSpace(_spaceId: number | string | null | undefined) {
	const spaceId =
		_spaceId !== null && _spaceId !== undefined ? Number(_spaceId) : null;

	return useQuery<Space>({
		queryKey: ["space", spaceId],
		queryFn: async () => {
			// const data = [] as unknown[]
			// return spaceSchema.parse(data)
			return dummySpaces[0] as Space;
		},
		enabled: typeof spaceId === "number",
	});
}
