'use client'

import { Card, CardContent, CardHeader } from '~/sushi-ui/components/card'
import { useMemo } from 'react'
import { useOptionsByProposal } from '~/app/_common/lib/hooks/backend/use-options-by-proposal'
import { useVotesByProposal } from '~/app/_common/lib/hooks/backend/use-votes-by-proposal'

interface ResultsProps {
	spaceId: number
	proposalId: number
}

export function Results({ spaceId, proposalId }: ResultsProps) {
	const { data: options, isLoading: isOptionsLoading } = useOptionsByProposal({
		spaceId,
		proposalId,
	})

	const { data: votes, isLoading: isVotesLoading } = useVotesByProposal({
		spaceId,
		proposalId,
	})

	const totalPower = useMemo(
		() => votes?.reduce((acc, vote) => acc + vote.voting_power, 0n),
		[votes],
	)

	const optionsWithVotes = useMemo(() => {
		return options?.map((option) => {
			const optionPower = votes?.reduce((acc, vote) => {
				if (vote.option_id === option.id) {
					return acc + vote.voting_power
				}
				return acc
			}, 0n)

			let percentage = 0

			if (totalPower !== 0n) {
				percentage = (Number(optionPower) / Number(totalPower)) * 100
			}

			return {
				name: option.name,
				power: optionPower,
				percentage,
			}
		})
	}, [votes, options, totalPower])

	if (isOptionsLoading || isVotesLoading) return <div>Loading...</div>

	if (!optionsWithVotes) return null

	return (
		<Card className="h-fit w-full">
			<CardHeader>
				<h2 className="text-lg">Results</h2>
			</CardHeader>
			<CardContent>
				{optionsWithVotes.map((option) => (
					<div className="flex justify-between" key={option.name}>
						<div className="font-semibold">{option.name}</div>
						<div>{option.percentage.toFixed(2)}%</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}
