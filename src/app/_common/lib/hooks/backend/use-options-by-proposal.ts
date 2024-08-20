import { useQuery } from '@tanstack/react-query'
import { decgov_backend } from '../../declarations'

interface UseOptionsByProposal {
	spaceId: number | undefined
	proposalId: number | undefined
}

export function useOptionsByProposal({
	spaceId,
	proposalId,
}: UseOptionsByProposal) {
	return useQuery({
		queryKey: ['options-by-proposal', { spaceId, proposalId }],
		queryFn: async () => {
			if (typeof spaceId !== 'number' || typeof proposalId !== 'number') {
				throw new Error('Invalid spaceId or proposalId')
			}

			const data = await decgov_backend.get_proposal_options(
				spaceId,
				proposalId,
			)

			const options = data[0]

			if (!options) {
				throw new Error('Fetch options by proposal failed')
			}

			return options
		},
		enabled: typeof spaceId === 'number' && typeof proposalId === 'number',
	})
}
