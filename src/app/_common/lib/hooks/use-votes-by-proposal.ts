import { useQueries } from "@tanstack/react-query";
import { decgov_backend } from "../declarations";
import { useOptionsByProposal } from "./use-options-by-proposal";
import { useMemo } from "react";

interface UseVotesByProposal {
	spaceId: number | undefined;
	proposalId: number | undefined;
}

export function useVotesByProposal({
	spaceId,
	proposalId,
}: UseVotesByProposal) {
	const { data: options } = useOptionsByProposal({ spaceId, proposalId });

	const queries = useQueries({
		queries: (options || []).map((option) => ({
			queryKey: [
				"votes-by-proposal",
				{ spaceId, proposalId, optionId: option.id },
			],
			queryFn: async () => {
				if (typeof spaceId !== "number" || typeof proposalId !== "number") {
					throw new Error("Invalid spaceId or proposalId");
				}

				const data = await decgov_backend.get_votes(
					spaceId,
					proposalId,
					option.id,
				);

				const votes = data[0];

				if (!votes) {
					throw new Error("Fetch votes by proposal failed");
				}

				return votes;
			},
			enableD: typeof spaceId === "number" && typeof proposalId === "number",
		})),
	});

	return {
		data: useMemo(() => {
			const votesByOption = queries
				.flatMap((query) => query.data)
				.filter((data): data is NonNullable<typeof data> => !!data);

			return votesByOption;
		}, [queries]),
		isLoading: queries.some((query) => query.isLoading),
		isError: queries.some((query) => query.isError),
		queries: queries,
	};
}
