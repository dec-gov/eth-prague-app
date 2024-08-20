import * as z from 'zod'

import { ChainType } from './chain-type'

export const baseStrategy = z
	.object({
		id: z.number(),
		name: z.string(),
		description: z.string(),
	})
	.transform((strategy) => ({
		...strategy,
		type: ChainType.EVM as ChainType,
	}))

export type BaseStrategy = z.infer<typeof baseStrategy>

export const evmStrategySchema = baseStrategy
	.innerType()
	.merge(
		z.object({
			contractAddress: z.string(),
			chainId: z.number(),
			configString: z.string(),
		}),
	)
	.transform((strategy) => ({
		id: strategy.id,
		name: strategy.name,
		description: strategy.description,
		chainId: strategy.chainId,
		address: strategy.contractAddress,
		config: strategy.configString,
		type: ChainType.EVM as const,
	}))

export type EvmStrategy = z.infer<typeof evmStrategySchema>

export function isEvmStrategy(strategy: Strategy): strategy is EvmStrategy {
	return strategy.type === ChainType.EVM
}

export const btcStrategySchema = baseStrategy
	.innerType()
	.merge(
		z.object({
			runeId: z.number(),
		}),
	)
	.transform((strategy) => ({
		...strategy,
		type: ChainType.BTC as const,
	}))

export type BtcStrategy = z.infer<typeof btcStrategySchema>

export function isBtcStrategy(strategy: Strategy): strategy is BtcStrategy {
	return strategy.type === ChainType.BTC
}

export type Strategy = EvmStrategy | BtcStrategy

export const dummyStrategies: Strategy[] = [
	{
		id: 0,
		name: 'EVM Strat',
		description:
			'EVM Strategy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		type: ChainType.EVM,
		address: '0x123',
		chainId: 1,
		config: '0x123ajbd$voter.',
	},
	{
		id: 1,
		name: 'BTC Ordinal',
		description: 'BTC Ordinal Strategy',
		type: ChainType.BTC,
		runeId: 1,
	},
]
