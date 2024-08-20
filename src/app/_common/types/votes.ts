import * as z from 'zod'

import { ChainType } from './chain-type'

export type ProposalOptionVote = {
	address: string
	type: ChainType
	timestamp: number
	signature: string
	power: bigint
	optionId: number
}

export const voteSchema = z
	.object({
		id: z.number(),
		signature: z.string(),
		optionId: z.number(),
		voteType: z.number(),
		votingPower: z.number(),
		userAddress: z.string(),
		timestamp: z.number(),
	})
	.transform((vote) => ({
		...vote,
		address: vote.userAddress,
		type: vote.userAddress.startsWith('0x') ? ChainType.EVM : ChainType.BTC,
		power: BigInt(vote.votingPower),
	}))

export const dummyProposalOptionVotes: ProposalOptionVote[] = [
	{
		address: '0x1',
		type: ChainType.EVM,
		timestamp: 1620000000,
		signature: '0x123',
		power: 10000000n,
		optionId: 0,
	},
	{
		address: '0x2',
		type: ChainType.EVM,
		timestamp: 1620000000,
		signature: '0x123',
		power: 250000000n,
		optionId: 0,
	},
	{
		address: '0x3',
		type: ChainType.EVM,
		timestamp: 1620000000,
		signature: '0x123',
		power: 300000000n,
		optionId: 1,
	},
]
