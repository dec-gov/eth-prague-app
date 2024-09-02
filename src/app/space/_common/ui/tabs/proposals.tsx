import formatDistance from 'date-fns/formatDistance'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { Proposal } from '~/app/_common/lib/declarations/decgov_backend.did'
import { useProposalsBySpace } from '~/app/_common/lib/hooks/backend/use-proposals-by-space'
import { useSpace } from '~/app/_common/lib/hooks/backend/use-space'
import { XOR } from '~/app/_common/types/xor'
import { Button, SkeletonText } from '~/sushi-ui'
import { Card, CardContent, CardHeader } from '~/sushi-ui/components/card'

function ProposalCard({
	spaceId,
	proposal,
	isLoading,
}: XOR<{ spaceId: number; proposal: Proposal }, { isLoading: true }>) {
	const { data: space, isLoading: isSpaceLoading } = useSpace({ spaceId })

	if (isLoading || isSpaceLoading)
		return (
			<Card className="h-[230px]">
				<CardHeader>
					<SkeletonText fontSize="2xl" className="w-full" />
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div>
							<SkeletonText fontSize="sm" />
							<SkeletonText fontSize="sm" />
							<SkeletonText fontSize="sm" />
							<SkeletonText fontSize="sm" />
						</div>
						<SkeletonText fontSize="sm" className="w-1/2" />
					</div>
				</CardContent>
			</Card>
		)

	const description =
		proposal.description.length > 400
			? `${proposal.description.slice(0, 400)}...`
			: proposal.description

	const endsAtDate = new Date(
		(Number(proposal.date_created) + (space?.vote_duration || 0)) * 1000,
	)
	const endsAtIn = formatDistance(endsAtDate, new Date(), {
		addSuffix: true,
	})

	return (
		<div key={proposal.id}>
			<Link
				href={`/space/proposal?spaceId=${spaceId}&proposalId=${proposal.id}`}
			>
				<Card>
					<CardHeader>
						<h2 className="text-2xl font-semibold">{proposal.title}</h2>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							<p className="text-sm text-ellipsis overflow-hidden">
								{description}
							</p>
							<div className="text-sm text-gray-300">Ends {endsAtIn}</div>
						</div>
					</CardContent>
				</Card>
			</Link>
		</div>
	)
}

export function Proposals({
	spaceId,
}: {
	spaceId: number
}) {
	const {
		data: proposals,
		isLoading,
		isError,
	} = useProposalsBySpace({ spaceId })

	const Shell = useCallback(
		({ children }: { children: React.ReactNode }) => (
			<div className="space-y-8">
				<div className="flex justify-between w-full items-center">
					<h1 className="text-2xl font-semibold">Proposals</h1>
					<Link href={`/space/proposal/create?spaceId=${spaceId}`}>
						<Button variant="outline">Create Proposal</Button>
					</Link>
				</div>
				<div className="space-y-4">{children}</div>
			</div>
		),
		[spaceId],
	)

	if (isError) return <Shell>An error has occurred</Shell>

	if (isLoading) {
		return (
			<Shell>
				<ProposalCard isLoading />
				<ProposalCard isLoading />
				<ProposalCard isLoading />
			</Shell>
		)
	}

	if (!proposals?.length) return <Shell>No proposals found</Shell>

	return (
		<Shell>
			{proposals.map((proposal) => (
				<ProposalCard key={proposal.id} spaceId={spaceId} proposal={proposal} />
			))}
		</Shell>
	)
}
