import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'
import { Address } from 'viem'
import { useAccount, useSignMessage } from 'wagmi'
import { decgov_backend } from '~/app/_common/lib/declarations'
import {
	Proposal,
	ProposalOption,
	Space,
} from '~/app/_common/lib/declarations/decgov_backend.did'
import { useVotingPower } from '~/app/_common/lib/hooks/backend/use-voting-power'
import { shortenAddress } from '~/app/_common/lib/shorten-address'
import { ChainType } from '~/app/_common/types/chain-type'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	List,
	SkeletonText,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '~/sushi-ui'
import { VotingPower } from '../voting-power'

interface VoteModalProps {
	space: Space
	proposal: Proposal
	option: ProposalOption
	children: React.ReactNode
}

type EvmVote = {
	spaceId: number
	optionId: number
	address: Address
	signature: string
}

function EvmVote({
	space,
	proposal,
	option,
}: {
	space: Space
	proposal: Proposal
	option: ProposalOption
}) {
	const { address, isConnected } = useAccount()
	const { openConnectModal } = useConnectModal()
	const { refetchQueries } = useQueryClient()

	const { data: power, isLoading } = useVotingPower({
		spaceId: space.id,
		voter: address,
	})

	const { mutate } = useMutation<bigint, Error, EvmVote>({
		mutationKey: [space.id, proposal.id, option.name, 'vote'],
		mutationFn: async (params) => {
			const result = await decgov_backend.vote({
				message: {
					address: params.address,
					space_id: params.spaceId,
					option_id: params.optionId,
					proposal_id: proposal.id,
					block_height: [],
				},
				signature: params.signature,
			})

			if ('Ok' in result) {
				return result.Ok
			}

			throw new Error('Failed to vote')
		},
		onSuccess: () => {
			refetchQueries({
				exact: false,
				queryKey: ['votes-by-proposal'],
			})
		},
	})

	const { signMessage } = useSignMessage({
		mutation: {
			onSuccess: async (signature) => {
				if (!address) return

				mutate({
					spaceId: space.id,
					optionId: option.id,
					address: address,
					signature: signature,
				})
			},
		},
	})

	const sign = useCallback(() => {
		if (!address) return

		const message = JSON.stringify({
			spaceId: space.id,
			optionId: option.id,
			address: address,
		})

		signMessage({
			message,
		})
	}, [address, option.id, signMessage, space.id])

	if (!isConnected)
		return (
			<Button fullWidth variant="outline" onClick={openConnectModal}>
				Connect Wallet
			</Button>
		)

	return (
		<div className="space-y-4">
			<List>
				<List.Control>
					<List.KeyValue title="Address">
						{address ? shortenAddress(address) : 'Not connected'}
					</List.KeyValue>
					<List.KeyValue title="Power">
						{isLoading ? (
							<SkeletonText />
						) : typeof power === 'undefined' ? (
							'-'
						) : (
							<VotingPower power={power} />
						)}
					</List.KeyValue>
				</List.Control>
			</List>
			<Button fullWidth variant="outline" onClick={sign} disabled={!power}>
				Vote
			</Button>
		</div>
	)
}

// function BtcVote() {
// 	return <div>-</div>
// }

export function VoteModal({
	space,
	proposal,
	option,
	children,
}: VoteModalProps) {
	const { connectModalOpen } = useConnectModal()
	const [tab, setTab] = useState<ChainType>(ChainType.EVM)

	return (
		<Dialog modal={!connectModalOpen}>
			<DialogTrigger className="w-full">{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Vote</DialogTitle>
				</DialogHeader>
				<div className="pt-4 space-y-4">
					<List>
						<List.Control>
							<List.KeyValue flex title="Proposal">
								{proposal.title}
							</List.KeyValue>
							<List.KeyValue flex title="Option">
								{option.name}
							</List.KeyValue>
						</List.Control>
					</List>
					<Tabs
						value={tab}
						onValueChange={(value) => setTab(value as ChainType)}
						className="w-full space-y-2"
					>
						<TabsList className="!flex">
							<TabsTrigger className="flex flex-1" value={ChainType.EVM}>
								EVM
							</TabsTrigger>
							<TabsTrigger
								className="flex flex-1"
								value={ChainType.BTC}
								disabled
							>
								BTC
							</TabsTrigger>
						</TabsList>
						<TabsContent value={ChainType.EVM}>
							<EvmVote space={space} proposal={proposal} option={option} />
						</TabsContent>
						{/* <TabsContent value={ChainType.BTC}>
							<BtcVote />
						</TabsContent> */}
					</Tabs>
				</div>
			</DialogContent>
		</Dialog>
	)
}
