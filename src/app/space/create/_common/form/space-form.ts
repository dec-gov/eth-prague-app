import { Space } from '~/app/_common/lib/declarations/decgov_backend.did'

export type NewSpace = Pick<
	Space,
	| 'name'
	| 'icon_link'
	| 'min_vote_power'
	| 'website_link'
	| 'owner_address'
	| 'vote_delay'
	| 'vote_duration'
> & {
	quorum: bigint
}
