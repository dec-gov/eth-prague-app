import { EvmStrategy } from '~/app/_common/lib/declarations/decgov_backend.did'

export type NewEvmStrategy = {
	strategy_type: 'evm'
} & Omit<EvmStrategy, 'strategy_id'>

export type NewBtcStrategy = {
	strategy_type: 'btc'
}

export type NewStrategy = {
	spaceId: number
	name: string
	description: string
	data: NewEvmStrategy | NewBtcStrategy
}
