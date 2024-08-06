import { useQuery } from "@tanstack/react-query";

import { Proposal, dummyProposals } from "~/app/_common/types/proposals";

export function useProposalsBySpace(
	_spaceId: number | string | null | undefined,
) {
	const spaceId =
		_spaceId !== null && _spaceId !== undefined ? Number(_spaceId) : null;

	return useQuery<Proposal[]>({
		queryKey: ["proposals-by-space", spaceId],
		queryFn: async () => {
			// const data = [] as unknown[]
			// return z.array(proposalSchema).parse(data)
			return dummyProposals;
		},
		enabled: typeof spaceId === "number",
	});
}
