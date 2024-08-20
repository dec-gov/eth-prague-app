import { useQuery } from '@tanstack/react-query'
import { decgov_backend } from '../../declarations'

interface UseProposal {
	spaceId: number | undefined
	proposalId: number | undefined
}

export function useProposal({ spaceId, proposalId }: UseProposal) {
	return useQuery({
		queryKey: ['proposal', { proposalId }],
		queryFn: async () => {
			if (typeof spaceId !== 'number' || typeof proposalId !== 'number') {
				throw new Error('Invalid spaceId or proposalId')
			}

			const data = await decgov_backend.get_proposal(spaceId, proposalId)

			const proposal = data[0]

			if (!proposal) {
				throw new Error('Fetch proposal failed')
			}

			return proposal
		},
		enabled: typeof spaceId === 'number' && typeof proposalId === 'number',
	})
}
