import type { ActorMethod } from '@dfinity/agent'
import type { IDL } from '@dfinity/candid'

export interface Event {
	event_trigger: EventTrigger
	data: EventData
	space_id: number
}
export type EventData = { Evm: EvmEvent } | { Webhook: WebhookEvent }
export type EventTrigger =
	| { ProposalEnded: null }
	| { Vote: null }
	| { ProposalCreated: null }
export interface EvmEvent {
	bytecode: string
	chain_id: number
	contract_address: string
}
export interface EvmStrategy {
	bytecode: string
	strategy_id: number
	chain_id: bigint
	contract_address: string
}
export interface InsertProposalOption {
	name: string
}
export interface Proposal {
	id: number
	title: string
	date_created: bigint
	mechanism: number
	description: string
	options: Array<ProposalOption>
	space_id: number
}
export interface ProposalOption {
	id: number
	votes: Array<ProposalOptionVote>
	name: string
	on_win_contract_address: string
	proposal_id: number
	on_win_bytecode: string
	on_win_chain_id: number
}
export interface ProposalOptionVote {
	id: number
	signature: string
	vote_type: number
	option_id: number
	user_address: string
	timestamp: bigint
	voting_power: bigint
}
export type Result = { Ok: bigint } | { Err: string }
export interface Space {
	id: number
	vote_delay: number
	vote_duration: number
	name: string
	website_link: string
	events: Array<Event>
	icon_link: string
	min_vote_role: number
	min_vote_power: bigint
	proposals: Array<Proposal>
	owner_address: string
	quorum: bigint
	strategies: Array<Strategy>
}
export interface Strategy {
	id: number
	data: StrategyData
	name: string
	description: string
	space_id: number
}
export type StrategyData = { Btc: {} } | { Evm: EvmStrategy }
export interface VoteData {
	signature: string
	message: VoteMessage
}
export interface VoteMessage {
	option_id: number
	address: string
	proposal_id: number
	block_height: [] | [string]
	space_id: number
}
export interface WebhookEvent {
	webhook_url: string
	payload: string
}
export interface _SERVICE {
	delete_proposal: ActorMethod<[number, number], [] | [Proposal]>
	delete_proposal_option: ActorMethod<
		[number, number, number],
		[] | [ProposalOption]
	>
	delete_space: ActorMethod<[number], [] | [Space]>
	delete_strategy: ActorMethod<[number, number], [] | [Strategy]>
	delete_vote: ActorMethod<
		[number, number, number, number],
		[] | [ProposalOptionVote]
	>
	get_events_by_space: ActorMethod<[number], [] | [Array<Event>]>
	get_proposal: ActorMethod<[number, number], [] | [Proposal]>
	get_proposal_option: ActorMethod<
		[number, number, number],
		[] | [ProposalOption]
	>
	get_proposal_options: ActorMethod<
		[number, number],
		[] | [Array<ProposalOption>]
	>
	get_proposals: ActorMethod<[number], [] | [Array<Proposal>]>
	get_space: ActorMethod<[number], [] | [Space]>
	get_spaces: ActorMethod<[], [] | [Array<Space>]>
	get_strategies: ActorMethod<[number], [] | [Array<Strategy>]>
	get_strategy: ActorMethod<[number, number], [] | [Strategy]>
	get_vote: ActorMethod<
		[number, number, number, number],
		[] | [ProposalOptionVote]
	>
	get_votes: ActorMethod<
		[number, number, number],
		[] | [Array<ProposalOptionVote>]
	>
	insert_event: ActorMethod<[number, EventTrigger, EventData], [] | [Event]>
	insert_evm_strategy: ActorMethod<
		[number, string, string, EvmStrategy],
		[] | [Strategy]
	>
	insert_proposal: ActorMethod<
		[number, string, string, number, Array<InsertProposalOption>],
		[] | [Proposal]
	>
	insert_proposal_option: ActorMethod<
		[number, number, string, string, string, number],
		[] | [ProposalOption]
	>
	insert_space: ActorMethod<
		[string, string, string, string, number, number, number, bigint, bigint],
		Space
	>
	insert_vote: ActorMethod<
		[number, number, number, string, number, bigint, string, bigint],
		[] | [ProposalOption]
	>
	update_evm_strategy: ActorMethod<
		[number, number, string, string, EvmStrategy],
		[] | [Strategy]
	>
	update_proposal: ActorMethod<
		[number, number, string, string, number],
		[] | [Proposal]
	>
	update_space: ActorMethod<
		[
			number,
			string,
			string,
			string,
			string,
			number,
			number,
			number,
			bigint,
			bigint,
		],
		[] | [Space]
	>
	update_space_proposals: ActorMethod<[number, Array<Proposal>], undefined>
	update_strategies: ActorMethod<[number, Array<Strategy>], undefined>
	update_vote: ActorMethod<
		[number, number, number, number, string, number, bigint, string, bigint],
		[] | [ProposalOptionVote]
	>
	vote: ActorMethod<[VoteData], Result>
	voting_power: ActorMethod<[string, number, [] | [string]], Result>
}
export declare const idlFactory: IDL.InterfaceFactory
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[]
