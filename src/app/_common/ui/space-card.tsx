import Link from 'next/link'
import { Card, CardContent } from '~/sushi-ui/components/card'
import { Space } from '../lib/declarations/decgov_backend.did'

export function SpaceCard({ space }: { space: Space }) {
	return (
		<Link href={`/space?spaceId=${space.id}`}>
			<Card className="select-none px-4">
				<CardContent className="flex justify-center items-center pt-6">
					<div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							width={96}
							height={96}
							src={space.icon_link}
							alt={space.name}
						/>
					</div>
					<div className="text-xl font-semibold">{space.name}</div>
				</CardContent>
			</Card>
		</Link>
	)
}
