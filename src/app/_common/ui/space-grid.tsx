import { Space } from '../lib/declarations/decgov_backend.did'
import { SpaceCard } from './space-card'

export function SpacesGrid({ spaces }: { spaces: Space[] }) {
	return (
		<div className="gap-12 grid md:grid-cols-4 sm:grid-cols-4 lg:grid-cols-5 grid-cols-2">
			{spaces.map((space) => (
				<SpaceCard key={space.id} space={space} />
			))}
		</div>
	)
}
