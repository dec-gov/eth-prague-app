'use client'

import { SpacesGrid } from './_common/ui/space-grid'
import Link from 'next/link'
import { Button } from '~/sushi-ui'

export default function HomePage() {
	return (
		<main className="space-y-4">
			<div className="justify-between w-full flex">
				<div />
				<Link href="/space/create">
					<Button variant="outline">Create Space</Button>
				</Link>
			</div>
			<SpacesGrid />
		</main>
	)
}
