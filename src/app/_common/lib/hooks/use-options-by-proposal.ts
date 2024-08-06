import { useQuery } from "@tanstack/react-query";
import {
	ProposalOption,
	dummyProposalOptions,
} from "~/app/_common/types/options";

export function useOptionsByProposal(
	_proposalId: number | string | null | undefined,
) {
	const proposalId =
		_proposalId !== null && _proposalId !== undefined
			? Number(_proposalId)
			: null;

	return useQuery<ProposalOption[]>({
		queryKey: ["options-by-proposal", proposalId],
		queryFn: async () => {
			// const data = [] as unknown[]
			// return z.array(optionSchema).parse(data)
			return dummyProposalOptions;
		},
		enabled: typeof proposalId === "number",
	});
}
