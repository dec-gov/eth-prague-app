// @ts-nocheck
export const idlFactory = ({ IDL }) => {
	const ProposalOptionVote = IDL.Record({
		id: IDL.Nat32,
		signature: IDL.Text,
		vote_type: IDL.Nat32,
		option_id: IDL.Nat32,
		user_address: IDL.Text,
		timestamp: IDL.Nat64,
		voting_power: IDL.Nat,
	})
	const ProposalOption = IDL.Record({
		id: IDL.Nat32,
		votes: IDL.Vec(ProposalOptionVote),
		name: IDL.Text,
		on_win_contract_address: IDL.Text,
		proposal_id: IDL.Nat32,
		on_win_bytecode: IDL.Text,
		on_win_chain_id: IDL.Nat32,
	})
	const Proposal = IDL.Record({
		id: IDL.Nat32,
		title: IDL.Text,
		date_created: IDL.Nat64,
		mechanism: IDL.Nat32,
		description: IDL.Text,
		options: IDL.Vec(ProposalOption),
		space_id: IDL.Nat32,
	})
	const EventTrigger = IDL.Variant({
		ProposalEnded: IDL.Null,
		Vote: IDL.Null,
		ProposalCreated: IDL.Null,
	})
	const EvmEvent = IDL.Record({
		bytecode: IDL.Text,
		chain_id: IDL.Nat32,
		contract_address: IDL.Text,
	})
	const WebhookEvent = IDL.Record({
		webhook_url: IDL.Text,
		payload: IDL.Text,
	})
	const EventData = IDL.Variant({ Evm: EvmEvent, Webhook: WebhookEvent })
	const Event = IDL.Record({
		event_trigger: EventTrigger,
		data: EventData,
		space_id: IDL.Nat32,
	})
	const EvmStrategy = IDL.Record({
		bytecode: IDL.Text,
		strategy_id: IDL.Nat32,
		chain_id: IDL.Nat64,
		contract_address: IDL.Text,
	})
	const StrategyData = IDL.Variant({
		Btc: IDL.Record({}),
		Evm: EvmStrategy,
	})
	const Strategy = IDL.Record({
		id: IDL.Nat32,
		data: StrategyData,
		name: IDL.Text,
		description: IDL.Text,
		space_id: IDL.Nat32,
	})
	const Space = IDL.Record({
		id: IDL.Nat32,
		vote_delay: IDL.Nat32,
		vote_duration: IDL.Nat32,
		name: IDL.Text,
		website_link: IDL.Text,
		events: IDL.Vec(Event),
		icon_link: IDL.Text,
		min_vote_role: IDL.Nat32,
		min_vote_power: IDL.Nat,
		proposals: IDL.Vec(Proposal),
		owner_address: IDL.Text,
		quorum: IDL.Nat,
		strategies: IDL.Vec(Strategy),
	})
	const InsertProposalOption = IDL.Record({ name: IDL.Text })
	const VoteMessage = IDL.Record({
		option_id: IDL.Nat32,
		address: IDL.Text,
		proposal_id: IDL.Nat32,
		block_height: IDL.Opt(IDL.Text),
		space_id: IDL.Nat32,
	})
	const VoteData = IDL.Record({
		signature: IDL.Text,
		message: VoteMessage,
	})
	const Result = IDL.Variant({ Ok: IDL.Nat, Err: IDL.Text })
	return IDL.Service({
		delete_proposal: IDL.Func([IDL.Nat32, IDL.Nat32], [IDL.Opt(Proposal)], []),
		delete_proposal_option: IDL.Func(
			[IDL.Nat32, IDL.Nat32, IDL.Nat32],
			[IDL.Opt(ProposalOption)],
			[],
		),
		delete_space: IDL.Func([IDL.Nat32], [IDL.Opt(Space)], []),
		delete_strategy: IDL.Func([IDL.Nat32, IDL.Nat32], [IDL.Opt(Strategy)], []),
		delete_vote: IDL.Func(
			[IDL.Nat32, IDL.Nat32, IDL.Nat32, IDL.Nat32],
			[IDL.Opt(ProposalOptionVote)],
			[],
		),
		get_events_by_space: IDL.Func(
			[IDL.Nat32],
			[IDL.Opt(IDL.Vec(Event))],
			['query'],
		),
		get_proposal: IDL.Func(
			[IDL.Nat32, IDL.Nat32],
			[IDL.Opt(Proposal)],
			['query'],
		),
		get_proposal_option: IDL.Func(
			[IDL.Nat32, IDL.Nat32, IDL.Nat32],
			[IDL.Opt(ProposalOption)],
			['query'],
		),
		get_proposal_options: IDL.Func(
			[IDL.Nat32, IDL.Nat32],
			[IDL.Opt(IDL.Vec(ProposalOption))],
			['query'],
		),
		get_proposals: IDL.Func(
			[IDL.Nat32],
			[IDL.Opt(IDL.Vec(Proposal))],
			['query'],
		),
		get_space: IDL.Func([IDL.Nat32], [IDL.Opt(Space)], ['query']),
		get_spaces: IDL.Func([], [IDL.Opt(IDL.Vec(Space))], ['query']),
		get_strategies: IDL.Func(
			[IDL.Nat32],
			[IDL.Opt(IDL.Vec(Strategy))],
			['query'],
		),
		get_strategy: IDL.Func(
			[IDL.Nat32, IDL.Nat32],
			[IDL.Opt(Strategy)],
			['query'],
		),
		get_vote: IDL.Func(
			[IDL.Nat32, IDL.Nat32, IDL.Nat32, IDL.Nat32],
			[IDL.Opt(ProposalOptionVote)],
			['query'],
		),
		get_votes: IDL.Func(
			[IDL.Nat32, IDL.Nat32, IDL.Nat32],
			[IDL.Opt(IDL.Vec(ProposalOptionVote))],
			['query'],
		),
		insert_event: IDL.Func(
			[IDL.Nat32, EventTrigger, EventData],
			[IDL.Opt(Event)],
			[],
		),
		insert_evm_strategy: IDL.Func(
			[IDL.Nat32, IDL.Text, IDL.Text, EvmStrategy],
			[IDL.Opt(Strategy)],
			[],
		),
		insert_proposal: IDL.Func(
			[IDL.Nat32, IDL.Text, IDL.Text, IDL.Nat32, IDL.Vec(InsertProposalOption)],
			[IDL.Opt(Proposal)],
			[],
		),
		insert_proposal_option: IDL.Func(
			[IDL.Nat32, IDL.Nat32, IDL.Text, IDL.Text, IDL.Text, IDL.Nat32],
			[IDL.Opt(ProposalOption)],
			[],
		),
		insert_space: IDL.Func(
			[
				IDL.Text,
				IDL.Text,
				IDL.Text,
				IDL.Text,
				IDL.Nat32,
				IDL.Nat32,
				IDL.Nat32,
				IDL.Nat,
				IDL.Nat,
			],
			[Space],
			[],
		),
		insert_vote: IDL.Func(
			[
				IDL.Nat32,
				IDL.Nat32,
				IDL.Nat32,
				IDL.Text,
				IDL.Nat32,
				IDL.Nat64,
				IDL.Text,
				IDL.Nat,
			],
			[IDL.Opt(ProposalOption)],
			[],
		),
		update_evm_strategy: IDL.Func(
			[IDL.Nat32, IDL.Nat32, IDL.Text, IDL.Text, EvmStrategy],
			[IDL.Opt(Strategy)],
			[],
		),
		update_proposal: IDL.Func(
			[IDL.Nat32, IDL.Nat32, IDL.Text, IDL.Text, IDL.Nat32],
			[IDL.Opt(Proposal)],
			[],
		),
		update_space: IDL.Func(
			[
				IDL.Nat32,
				IDL.Text,
				IDL.Text,
				IDL.Text,
				IDL.Text,
				IDL.Nat32,
				IDL.Nat32,
				IDL.Nat32,
				IDL.Nat,
				IDL.Nat,
			],
			[IDL.Opt(Space)],
			[],
		),
		update_space_proposals: IDL.Func([IDL.Nat32, IDL.Vec(Proposal)], [], []),
		update_strategies: IDL.Func([IDL.Nat32, IDL.Vec(Strategy)], [], []),
		update_vote: IDL.Func(
			[
				IDL.Nat32,
				IDL.Nat32,
				IDL.Nat32,
				IDL.Nat32,
				IDL.Text,
				IDL.Nat32,
				IDL.Nat64,
				IDL.Text,
				IDL.Nat,
			],
			[IDL.Opt(ProposalOptionVote)],
			[],
		),
		vote: IDL.Func([VoteData], [Result], []),
		voting_power: IDL.Func(
			[IDL.Text, IDL.Nat32, IDL.Opt(IDL.Text)],
			[Result],
			[],
		),
	})
}

// eslint-disable-next-line
export const init = ({ IDL }) => {
	return []
}
