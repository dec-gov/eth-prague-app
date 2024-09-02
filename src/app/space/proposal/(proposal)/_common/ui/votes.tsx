'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Card } from '~/sushi-ui'
import { DataTable } from '~/sushi-ui/components/data-table/index'
import numeral from 'numbro'
import { ProposalOptionVote } from '~/app/_common/lib/declarations/decgov_backend.did'
import { useVotesByProposal } from '~/app/_common/lib/hooks/backend/use-votes-by-proposal'
import { useMemo } from 'react'

const COLUMNS: ColumnDef<ProposalOptionVote, unknown>[] = [
	{
		id: 'voter',
		header: 'Voter',
		cell: ({ row }) => row.original.user_address,
	},
	{
		id: 'option',
		header: 'Option',
		cell: ({ row }) => row.original.option_id,
	},
	{
		id: 'power',
		header: 'Voting Power',
		cell: ({ row }) =>
			numeral(Number(row.original.voting_power)).format('0.00a'),
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
