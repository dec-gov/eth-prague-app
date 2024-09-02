import { Strategy, EvmStrategy } from '../lib/declarations/decgov_backend.did'

export enum StrategyType {
	EVM = 'evm',
	Bitcoin = 'btc',
}

export type StrategyWithEvm = Omit<Strategy, 'data'> & {
	data: { Evm: EvmStrategy }
}

export function hasEvmStrategy(
	strategy: Strategy,
): strategy is StrategyWithEvm {
	return 'Evm' in strategy.data
}
