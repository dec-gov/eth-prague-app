'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSpace } from '~/app/_common/lib/hooks/backend/use-space'
import { Sidebar } from './_common/ui/sidebar'
import { Events } from './_common/ui/tabs/events'
import { Proposals } from './_common/ui/tabs/proposals'
import { Strategies } from './_common/ui/tabs/strategies'
import { Container } from '~/sushi-ui'

const tabs = ['Proposals', 'Strategies', 'Events'] as const

function Tab({
	tab,
	spaceId,
}: { tab: (typeof tabs)[number]; spaceId: number }) {
	switch (tab) {
		case 'Proposals':
			return <Proposals spaceId={spaceId} />
		case 'Strategies':
			return <Strategies spaceId={spaceId} />
		case 'Events':
			return <Events spaceId={spaceId} />
	}
}

export default function SpacePage() {
	const [currentTab, setTab] = useState<(typeof tabs)[number]>(tabs[0])

	const params = useSearchParams()
	const spaceId = params.get('spaceId')
		? Number(params.get('spaceId'))
		: undefined

	const { data: space, isLoading: isSpaceLoading } = useSpace({
		spaceId,
	})

	if (isSpaceLoading) return <div>Loading...</div>

	if (!space || spaceId === undefined) return <div>Space not found</div>

	return (
		<Container maxWidth="4xl">
			<div className="grid grid-cols-4 gap-12 w-full">
				<Sidebar
					space={space}
					currentTab={currentTab}
					setTab={setTab}
					tabs={tabs}
				/>
				<div className="col-span-3">
					<div />
					<Tab tab={currentTab} spaceId={spaceId} />
				</div>
			</div>
		</Container>
	)
}
