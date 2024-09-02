'use client'

import { Card, CardContent } from '~/sushi-ui/components/card'
import { VoteModal } from './vote-modal'
import { useOptionsByProposal } from '~/app/_common/lib/hooks/backend/use-options-by-proposal'
import { useProposal } from '~/app/_common/lib/hooks/backend/use-proposal'
import { useSpace } from '~/app/_common/lib/hooks/backend/use-space'

export function Vote({
	spaceId,
	proposalId,
}: {
	spaceId: number
	proposalId: number
}) {
	const { data: space, isLoading: isSpaceLoading } = useSpace({
		spaceId,
	})

	const { data: proposal, isLoading: isProposalLoading } = useProposal({
		spaceId,
		proposalId,
	})

	const { data: options, isLoading: isOptionsLoading } = useOptionsByProposal({
		spaceId,
		proposalId,
	})

	if (isSpaceLoading || isProposalLoading || isOptionsLoading)
		return <div>Loading...</div>

	if (!space || !proposal || !options) return null

	return (
		<div className="space-y-4">
			<h2 className="text-lg">Vote</h2>
			<div className="space-y-4">
				{options.map((option) => (
					<div
						key={option.name}
						className="flex items-center space-y-2 w-full cursor-pointer"
					>
						<VoteModal space={space} proposal={proposal} option={option}>
							<Card className="w-full flex justify-center">
								<CardContent className="!p-3">{option.name}</CardContent>
							</Card>
						</VoteModal>
					</div>
				))}
			</div>
		</div>
	)
}
