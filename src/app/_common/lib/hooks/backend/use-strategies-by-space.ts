import { useQuery } from '@tanstack/react-query'
import { decgov_backend } from '../../declarations'

interface UseStrategiesBySpace {
	spaceId: number | undefined
}

export function useStrategiesBySpace({ spaceId }: UseStrategiesBySpace) {
	return useQuery({
		queryKey: ['strategies-by-space', { spaceId }],
		queryFn: async () => {
			if (typeof spaceId !== 'number') {
				throw new Error('Invalid spaceId or proposalId')
			}

			const data = await decgov_backend.get_strategies(spaceId)

			const strategies = data[0]

			if (!strategies) {
				throw new Error('Fetch strategies by space failed')
			}

			return strategies
		},
		enabled: typeof spaceId === 'number',
	})
}
