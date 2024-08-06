import { useQuery } from "@tanstack/react-query";
import { Proposal, dummyProposals } from "~/app/_common/types/proposals";

export function useProposal(_proposalId: number | string | null | undefined) {
	const proposalId =
		_proposalId !== null && _proposalId !== undefined
			? Number(_proposalId)
			: null;

	return useQuery<Proposal>({
		queryKey: ["proposal", proposalId],
		queryFn: async () => {
			// const data = [] as unknown[]
			// return proposalSchema.parse(data)
			return dummyProposals[0] as Proposal;
		},
		enabled: typeof proposalId === "number",
	});
}
