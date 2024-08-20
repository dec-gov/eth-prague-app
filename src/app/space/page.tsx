'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useProposalsBySpace } from '~/app/_common/lib/hooks/backend/use-proposals-by-space'
import { useSpace } from '~/app/_common/lib/hooks/backend/use-space'
import { useStrategiesBySpace } from '~/app/_common/lib/hooks/backend/use-strategies-by-space'
import { Sidebar } from './_common/ui/sidebar'
import { Events } from './_common/ui/tabs/events'
import { Proposals } from './_common/ui/tabs/proposals'
import { Strategies } from './_common/ui/tabs/strategies'
import { useIsMounted } from '../_common/lib/hooks/useIsMounted'
import { Container } from '~/sushi-ui'

const tabs = ['Proposals', 'Strategies', 'Events'] as const

export default function SpacePage() {
	const [currentTab, setTab] = useState<(typeof tabs)[number]>(tabs[0])
	const isMounted = useIsMounted()

	const params = useSearchParams()
	const spaceId = params.get('spaceId')
		? Number(params.get('spaceId'))
		: undefined

	const { data: space, isLoading: isSpaceLoading } = useSpace({
		spaceId,
	})
	const { data: proposals, isLoading: isProposalsLoading } =
		useProposalsBySpace({ spaceId })
	const { data: strategies, isLoading: isStrategiesLoading } =
		useStrategiesBySpace({ spaceId })

	if (!isMounted || isSpaceLoading || isProposalsLoading || isStrategiesLoading)
		return <div>Loading...</div>

	if (!space) return <div>Space not found</div>
	if (!proposals) return <div>Proposals not found</div>
	if (!strategies) return <div>Strategies not found</div>

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
					{currentTab === 'Proposals' ? (
						<Proposals space={space} proposals={proposals} />
					) : null}
					{currentTab === 'Strategies' ? (
						<Strategies strategies={strategies} />
					) : null}
					{currentTab === 'Events' ? <Events space={space} /> : null}
				</div>
			</div>
		</Container>
	)
}
