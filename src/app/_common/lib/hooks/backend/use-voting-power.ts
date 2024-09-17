import { useQuery } from '@tanstack/react-query'
import { Address } from 'viem'
import { decgov_backend } from '../../declarations'

interface UseVotingPower {
	voter: Address | undefined
	spaceId: number
	blockNumber?: number | undefined
}

export function useVotingPower({
	spaceId,
	blockNumber,
	voter,
}: UseVotingPower) {
	return useQuery({
		queryKey: ['voting-power', voter, spaceId, blockNumber],
		queryFn: async () => {
			if (typeof voter !== 'string' || typeof spaceId !== 'number') {
				throw new Error('Invalid voter or spaceId')
			}

			const data = await decgov_backend.voting_power(
				voter,
				spaceId,
				blockNumber ? [String(blockNumber)] : [],
			)

			if (!('Ok' in data)) {
				throw new Error('Fetch voting power failed')
			}

			return data.Ok
		},
		enabled: typeof voter === 'string' && typeof spaceId === 'number',
	})
}
