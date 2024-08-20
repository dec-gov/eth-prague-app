import * as z from 'zod'

export enum MinProposalCreator {
	ADMIN = 0,
	ANYONE = 1,
}

export const spaceSchema = z
	.object({
		id: z.number(),
		name: z.string(),
		iconLink: z.string(),
		websiteLink: z.string(),
		minVoteRole: z
			.number()
			.transform((x) =>
				x ? MinProposalCreator.ANYONE : MinProposalCreator.ADMIN,
			),
		minVotePower: z.number(),
		voteDelay: z.number(),
		voteDuration: z.number(),
		quorum: z.string(),
	})
	.transform((space) => ({
		id: space.id,
		name: space.name,
		iconLink: space.iconLink,
		websiteLink: space.websiteLink,
		voteDelay: space.voteDelay,
		voteDuration: space.voteDuration,
		minProposalCreator: space.minVoteRole,
		minProposalCreatorPower: BigInt(Math.floor(space.minVotePower)),
		quorum: BigInt(space.quorum),
	}))

export type Space = z.infer<typeof spaceSchema>

export const dummySpaces: Space[] = [
	{
		id: 0,
		name: 'AAVE',
		iconLink: 'https://cryptologos.cc/logos/aave-aave-logo.png',
		websiteLink: 'https://aave.com',
		minProposalCreator: MinProposalCreator.ADMIN,
		minProposalCreatorPower: 0n,
		voteDelay: 0,
		voteDuration: 172800,
		quorum: 100n,
	},
	{
		id: 1,
		name: 'Compound',
		iconLink: 'https://cryptologos.cc/logos/compound-comp-logo.png',
		websiteLink: 'https://compound.finance',
		minProposalCreator: MinProposalCreator.ANYONE,
		minProposalCreatorPower: 100n,
		voteDelay: 0,
		voteDuration: 172800,
		quorum: 0n,
	},
	{
		id: 2,
		name: 'Compound',
		iconLink: 'https://cryptologos.cc/logos/compound-comp-logo.png',
		websiteLink: 'https://compound.finance',
		minProposalCreator: MinProposalCreator.ANYONE,
		minProposalCreatorPower: 100n,
		voteDelay: 0,
		voteDuration: 172800,
		quorum: 0n,
	},
	{
		id: 3,
		name: 'Compound',
		iconLink: 'https://cryptologos.cc/logos/compound-comp-logo.png',
		websiteLink: 'https://compound.finance',
		minProposalCreator: MinProposalCreator.ANYONE,
		minProposalCreatorPower: 100n,
		voteDelay: 0,
		voteDuration: 172800,
		quorum: 0n,
	},
	{
		id: 4,
		name: 'Compound',
		iconLink: 'https://cryptologos.cc/logos/compound-comp-logo.png',
		websiteLink: 'https://compound.finance',
		minProposalCreator: MinProposalCreator.ANYONE,
		minProposalCreatorPower: 100n,
		voteDelay: 0,
		voteDuration: 172800,
		quorum: 0n,
	},
	{
		id: 5,
		name: 'Compound',
		iconLink: 'https://cryptologos.cc/logos/compound-comp-logo.png',
		websiteLink: 'https://compound.finance',
		minProposalCreator: MinProposalCreator.ANYONE,
		minProposalCreatorPower: 100n,
		voteDelay: 0,
		voteDuration: 172800,
		quorum: 0n,
	},
	{
		id: 6,
		name: 'Compound',
		iconLink: 'https://cryptologos.cc/logos/compound-comp-logo.png',
		websiteLink: 'https://compound.finance',
		minProposalCreator: MinProposalCreator.ANYONE,
		minProposalCreatorPower: 100n,
		voteDelay: 0,
		voteDuration: 172800,
		quorum: 0n,
	},
	{
		id: 7,
		name: 'Compound',
		iconLink: 'https://cryptologos.cc/logos/compound-comp-logo.png',
		websiteLink: 'https://compound.finance',
		minProposalCreator: MinProposalCreator.ANYONE,
		minProposalCreatorPower: 100n,
		voteDelay: 0,
		voteDuration: 172800,
		quorum: 0n,
	},
]
