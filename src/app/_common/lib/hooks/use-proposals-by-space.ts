import { useQuery } from "@tanstack/react-query";
import { decgov_backend } from "../declarations";

interface UseProposalsBySpace {
	spaceId: number | undefined;
}

export function useProposalsBySpace({ spaceId }: UseProposalsBySpace) {
	return useQuery({
		queryKey: ["proposals-by-space", { spaceId }],
		queryFn: async () => {
			if (typeof spaceId !== "number") {
				throw new Error("Invalid spaceId");
			}

			const data = await decgov_backend.get_proposals(spaceId);

			const proposals = data[0];

			if (!proposals) {
				throw new Error("Fetch proposals by space failed");
			}

			return proposals;
		},
		enabled: typeof spaceId === "number",
	});
}
