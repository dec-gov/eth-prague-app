import { useQuery } from "@tanstack/react-query";
import {
	ProposalOptionVote,
	dummyProposalOptionVotes,
} from "~/app/_common/types/votes";

export function useVotesByProposal(
	_proposalId: number | string | null | undefined,
) {
	const proposalId =
		_proposalId !== null && _proposalId !== undefined
			? Number(_proposalId)
			: null;

	return useQuery<ProposalOptionVote[]>({
		queryKey: ["votes-by-proposal", Number(proposalId)],
		queryFn: async () => {
			// const data = parseDfinityResult(result)
			// return z.array(voteSchema).parse(data)
			return dummyProposalOptionVotes;
		},
		enabled: typeof proposalId === "number",
	});
}
