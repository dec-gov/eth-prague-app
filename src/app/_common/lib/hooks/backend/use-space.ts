import { useQuery } from '@tanstack/react-query'
import { decgov_backend } from '../../declarations'

interface UseSpace {
	spaceId: number | undefined
}

export function useSpace({ spaceId }: UseSpace) {
	return useQuery({
		queryKey: ['space', { spaceId }],
		queryFn: async () => {
			if (typeof spaceId !== 'number') {
				throw new Error('Invalid spaceId')
			}

			const data = await decgov_backend.get_space(spaceId)

			const space = data[0]

			if (!space) {
				throw new Error('Fetch space failed')
			}

			return space
		},
		enabled: typeof spaceId === 'number',
	})
}
