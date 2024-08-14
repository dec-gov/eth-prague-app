export const idlFactory = ({ IDL }) => {
  const ProposalOptionVote = IDL.Record({
    'id' : IDL.Nat32,
    'signature' : IDL.Text,
    'vote_type' : IDL.Nat32,
    'option_id' : IDL.Nat32,
    'user_address' : IDL.Text,
    'timestamp' : IDL.Nat32,
    'voting_power' : IDL.Nat64,
  });
  const ProposalOption = IDL.Record({
    'id' : IDL.Nat32,
    'votes' : IDL.Vec(ProposalOptionVote),
    'name' : IDL.Text,
    'on_win_contract_address' : IDL.Text,
    'proposal_id' : IDL.Nat32,
    'on_win_bytecode' : IDL.Text,
    'on_win_chain_id' : IDL.Nat32,
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat32,
    'title' : IDL.Text,
    'date_created' : IDL.Nat32,
    'mechanism' : IDL.Nat32,
    'description' : IDL.Text,
    'options' : IDL.Vec(ProposalOption),
    'space_id' : IDL.Nat32,
  });
  const Space = IDL.Record({
    'id' : IDL.Nat32,
    'vote_delay' : IDL.Nat32,
    'vote_duration' : IDL.Nat32,
    'name' : IDL.Text,
    'website_link' : IDL.Text,
    'icon_link' : IDL.Text,
    'min_vote_role' : IDL.Nat32,
    'min_vote_power' : IDL.Nat64,
    'proposals' : IDL.Vec(Proposal),
    'quorum' : IDL.Nat32,
  });
  return IDL.Service({
    'delete_proposal' : IDL.Func(
        [IDL.Nat32, IDL.Nat32],
        [IDL.Opt(Proposal)],
        [],
      ),
    'delete_proposal_option' : IDL.Func(
        [IDL.Nat32, IDL.Nat32, IDL.Nat32],
        [IDL.Opt(ProposalOption)],
        [],
      ),
    'delete_space' : IDL.Func([IDL.Nat32], [IDL.Opt(Space)], []),
    'delete_vote' : IDL.Func(
        [IDL.Nat32, IDL.Nat32, IDL.Nat32, IDL.Nat32],
        [IDL.Opt(ProposalOptionVote)],
        [],
      ),
    'get_proposal' : IDL.Func(
        [IDL.Nat32, IDL.Nat32],
        [IDL.Opt(Proposal)],
        ['query'],
      ),
    'get_proposal_option' : IDL.Func(
        [IDL.Nat32, IDL.Nat32, IDL.Nat32],
        [IDL.Opt(ProposalOption)],
        ['query'],
      ),
    'get_proposal_options' : IDL.Func(
        [IDL.Nat32, IDL.Nat32],
        [IDL.Opt(IDL.Vec(ProposalOption))],
        ['query'],
      ),
    'get_proposals' : IDL.Func(
        [IDL.Nat32],
        [IDL.Opt(IDL.Vec(Proposal))],
        ['query'],
      ),
    'get_space' : IDL.Func([IDL.Nat32], [IDL.Opt(Space)], ['query']),
    'get_spaces' : IDL.Func([], [IDL.Opt(IDL.Vec(Space))], ['query']),
    'get_vote' : IDL.Func(
        [IDL.Nat32, IDL.Nat32, IDL.Nat32, IDL.Nat32],
        [IDL.Opt(ProposalOptionVote)],
        ['query'],
      ),
    'get_votes' : IDL.Func(
        [IDL.Nat32, IDL.Nat32, IDL.Nat32],
        [IDL.Opt(IDL.Vec(ProposalOptionVote))],
        ['query'],
      ),
    'insert_proposal' : IDL.Func(
        [IDL.Nat32, IDL.Text, IDL.Text, IDL.Nat32, IDL.Nat32],
        [IDL.Opt(Proposal)],
        [],
      ),
    'insert_proposal_option' : IDL.Func(
        [IDL.Nat32, IDL.Nat32, IDL.Text, IDL.Text, IDL.Text, IDL.Nat32],
        [IDL.Opt(ProposalOption)],
        [],
      ),
    'insert_space' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat64,
          IDL.Nat32,
        ],
        [Space],
        [],
      ),
    'insert_vote' : IDL.Func(
        [
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Text,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Text,
          IDL.Nat64,
        ],
        [IDL.Opt(ProposalOption)],
        [],
      ),
    'update_proposal' : IDL.Func(
        [IDL.Nat32, IDL.Nat32, IDL.Text, IDL.Text, IDL.Nat32, IDL.Nat32],
        [IDL.Opt(Proposal)],
        [],
      ),
    'update_proposal_option' : IDL.Func(
        [
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat32,
        ],
        [IDL.Opt(ProposalOption)],
        [],
      ),
    'update_proposal_options' : IDL.Func(
        [IDL.Nat32, IDL.Nat32, IDL.Vec(ProposalOption)],
        [IDL.Opt(Proposal)],
        [],
      ),
    'update_space' : IDL.Func(
        [
          IDL.Nat32,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat64,
          IDL.Nat32,
        ],
        [IDL.Opt(Space)],
        [],
      ),
    'update_space_proposals' : IDL.Func([IDL.Nat32, IDL.Vec(Proposal)], [], []),
    'update_vote' : IDL.Func(
        [
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Text,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Text,
          IDL.Nat64,
        ],
        [IDL.Opt(ProposalOptionVote)],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
