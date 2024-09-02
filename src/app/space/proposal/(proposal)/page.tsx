'use client'

import { useSearchParams } from 'next/navigation'
import { useProposal } from '~/app/_common/lib/hooks/backend/use-proposal'
import { Body } from './_common/ui/body'
import { Information } from './_common/ui/information'
import { Results } from './_common/ui/results'
import { Vote } from './_common/ui/vote/vote'
import { Votes } from './_common/ui/votes'
import { Container } from '~/sushi-ui'

export default function SpacePage() {
	const params = useSearchParams()
	const spaceId = params.get('spaceId')
		? Number(params.get('spaceId'))
		: undefined
	const proposalId = params.get('proposalId')
		? Number(params.get('proposalId'))
		: undefined

	const { data: proposal, isLoading: isProposalLoading } = useProposal({
		spaceId,
		proposalId,
	})

	if (isProposalLoading) return <div>Loading...</div>

	if (!proposal) return <div>Proposal not found</div>

	if (spaceId === undefined || proposalId === undefined) return null

	return (
		<Container maxWidth="4xl">
			<h1 className="text-2xl font-semibold">{proposal.title}</h1>
			<div className="grid grid-cols-5 gap-8 w-full">
				<div className="col-span-3 space-y-6">
					<Body content={proposal.description} />
					<Vote spaceId={spaceId} proposalId={proposalId} />
					<Votes spaceId={spaceId} proposalId={proposalId} />
				</div>
				<div className="col-span-2 space-y-6">
					<Information spaceId={spaceId} proposalId={proposalId} />
					<Results spaceId={spaceId} proposalId={proposalId} />
				</div>
			</div>
		</Container>
	)
}
