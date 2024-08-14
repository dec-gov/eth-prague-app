import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Proposal {
  'id' : number,
  'title' : string,
  'date_created' : number,
  'mechanism' : number,
  'description' : string,
  'options' : Array<ProposalOption>,
  'space_id' : number,
}
export interface ProposalOption {
  'id' : number,
  'votes' : Array<ProposalOptionVote>,
  'name' : string,
  'on_win_contract_address' : string,
  'proposal_id' : number,
  'on_win_bytecode' : string,
  'on_win_chain_id' : number,
}
export interface ProposalOptionVote {
  'id' : number,
  'signature' : string,
  'vote_type' : number,
  'option_id' : number,
  'user_address' : string,
  'timestamp' : number,
  'voting_power' : bigint,
}
export interface Space {
  'id' : number,
  'vote_delay' : number,
  'vote_duration' : number,
  'name' : string,
  'website_link' : string,
  'icon_link' : string,
  'min_vote_role' : number,
  'min_vote_power' : bigint,
  'proposals' : Array<Proposal>,
  'quorum' : number,
}
export interface _SERVICE {
  'delete_proposal' : ActorMethod<[number, number], [] | [Proposal]>,
  'delete_proposal_option' : ActorMethod<
    [number, number, number],
    [] | [ProposalOption]
  >,
  'delete_space' : ActorMethod<[number], [] | [Space]>,
  'delete_vote' : ActorMethod<
    [number, number, number, number],
    [] | [ProposalOptionVote]
  >,
  'get_proposal' : ActorMethod<[number, number], [] | [Proposal]>,
  'get_proposal_option' : ActorMethod<
    [number, number, number],
    [] | [ProposalOption]
  >,
  'get_proposal_options' : ActorMethod<
    [number, number],
    [] | [Array<ProposalOption>]
  >,
  'get_proposals' : ActorMethod<[number], [] | [Array<Proposal>]>,
  'get_space' : ActorMethod<[number], [] | [Space]>,
  'get_spaces' : ActorMethod<[], [] | [Array<Space>]>,
  'get_vote' : ActorMethod<
    [number, number, number, number],
    [] | [ProposalOptionVote]
  >,
  'get_votes' : ActorMethod<
    [number, number, number],
    [] | [Array<ProposalOptionVote>]
  >,
  'insert_proposal' : ActorMethod<
    [number, string, string, number, number],
    [] | [Proposal]
  >,
  'insert_proposal_option' : ActorMethod<
    [number, number, string, string, string, number],
    [] | [ProposalOption]
  >,
  'insert_space' : ActorMethod<
    [string, string, string, number, number, number, bigint, number],
    Space
  >,
  'insert_vote' : ActorMethod<
    [number, number, number, string, number, number, string, bigint],
    [] | [ProposalOption]
  >,
  'update_proposal' : ActorMethod<
    [number, number, string, string, number, number],
    [] | [Proposal]
  >,
  'update_proposal_option' : ActorMethod<
    [number, number, number, string, string, string, number],
    [] | [ProposalOption]
  >,
  'update_proposal_options' : ActorMethod<
    [number, number, Array<ProposalOption>],
    [] | [Proposal]
  >,
  'update_space' : ActorMethod<
    [number, string, string, string, number, number, number, bigint, number],
    [] | [Space]
  >,
  'update_space_proposals' : ActorMethod<[number, Array<Proposal>], undefined>,
  'update_vote' : ActorMethod<
    [number, number, number, number, string, number, number, string, bigint],
    [] | [ProposalOptionVote]
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
