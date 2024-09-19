'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Card, HoverCard, HoverCardContent, HoverCardTrigger } from '~/sushi-ui'
import { DataTable } from '~/sushi-ui/components/data-table/index'
import { ProposalOptionVote } from '~/app/_common/lib/declarations/decgov_backend.did'
import { useVotesByProposal } from '~/app/_common/lib/hooks/backend/use-votes-by-proposal'
import { useMemo } from 'react'
import { VotingPower } from './voting-power'
import { shortenAddress } from '~/app/_common/lib/shorten-address'

const COLUMNS: ColumnDef<ProposalOptionVote, unknown>[] = [
	{
		id: 'voter',
		header: 'Voter',
		cell: ({ row }) => (
			<HoverCard openDelay={100} closeDelay={0}>
				<HoverCardTrigger>
					{shortenAddress(row.original.user_address)}
				</HoverCardTrigger>
				<HoverCardContent>
					<div>{row.original.user_address}</div>
				</HoverCardContent>
			</HoverCard>
		),
	},
	{
		id: 'option',
		header: 'Option',
		cell: ({ row }) => row.original.option_id,
	},
	{
		id: 'power',
		header: 'Voting Power',
		cell: ({ row }) => <VotingPower power={row.original.voting_power} />,
	},
]

export function Votes({
	spaceId,
	proposalId,
}: { spaceId: number; proposalId: number }) {
	const { data: votes, isLoading: isVotesLoading } = useVotesByProposal({
		spaceId,
		proposalId,
	})

	const sorted = useMemo(
		() => votes?.sort((a, b) => (a.voting_power > b.voting_power ? -1 : 1)),
		[votes],
	)

	if (isVotesLoading) return <div>Loading...</div>

	if (!sorted) return null

	return (
		<div className="space-y-4">
			<h2 className="text-lg">Votes</h2>
			<Card>
				<DataTable data={sorted} columns={COLUMNS} loading={false} />
			</Card>
		</div>
	)
}
