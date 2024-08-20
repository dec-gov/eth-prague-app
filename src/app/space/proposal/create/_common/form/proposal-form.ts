import {
	InsertProposalOption,
	Proposal,
} from '~/app/_common/lib/declarations/decgov_backend.did'

export enum ProposalMechanism {
	SINGLE = 0,
	MULTIPLE = 1,
}

export enum OptionType {
	Simple = 'Simple Option',
	Execution = 'Execution Option',
}

export type NewProposal = Pick<
	Proposal,
	'title' | 'description' | 'mechanism'
> & {
	spaceId: number
	mechanism: ProposalMechanism
	options: (InsertProposalOption & {
		type: OptionType
	})[]
}
