import Link from 'next/link'
import React, { useCallback } from 'react'
import { Strategy } from '~/app/_common/lib/declarations/decgov_backend.did'
import { useStrategiesBySpace } from '~/app/_common/lib/hooks/backend/use-strategies-by-space'
import { hasEvmStrategy } from '~/app/_common/types/strategies'
import { XOR } from '~/app/_common/types/xor'
import { Button, SkeletonText } from '~/sushi-ui'
import { Card, CardContent, CardHeader } from '~/sushi-ui/components/card'

function StrategyCard({
	strategy,
	isLoading,
}: XOR<{ strategy: Strategy }, { isLoading: true }>) {
	const Shell = useCallback(
		({ children }: { children: React.ReactNode }) => {
			if (isLoading) return null

			return (
				<Card>
					<CardHeader>
						<h2 className="text-2xl font-semibold">{strategy.name}</h2>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							<p className="text-sm">{strategy.description}</p>
							<div className="space-y-1 w-full">{children}</div>
						</div>
					</CardContent>
				</Card>
			)
		},
		[isLoading, strategy?.description, strategy?.name],
	)

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<SkeletonText fontSize="2xl" />
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div>
							<SkeletonText fontSize="sm" />
							<SkeletonText fontSize="sm" />
							<SkeletonText fontSize="sm" />
						</div>
						<div className="space-y-1">
							<SkeletonText />
							<SkeletonText />
						</div>
					</div>
				</CardContent>
			</Card>
		)
	}

	if (hasEvmStrategy(strategy)) {
		const evmStrategy = strategy.data.Evm

		return (
			<Shell>
				<div className="flex justify-between">
					<span className="font-semibold">Type:</span>
					<span>EVM</span>
				</div>
				<div className="flex justify-between">
					<span className="font-semibold">ChainId:</span>
					<span>{evmStrategy.chain_id}</span>
				</div>
				<div className="flex justify-between">
					<span className="font-semibold">Address:</span>
					<span>{evmStrategy.contract_address}</span>
				</div>
				<div className="flex justify-between">
					<span className="font-semibold">Config:</span>
					<span>{evmStrategy.bytecode}</span>
				</div>
			</Shell>
		)
	}

	// if (isBtcStrategy(strategy)) {
	// 	return (
	// 		<Shell>
	// 			<div className="flex justify-between">
	// 				<span className="font-semibold">Type:</span>
	// 				<span>{strategy.type}</span>
	// 			</div>
	// 			<div className="flex justify-between">
	// 				<span className="font-semibold">Rune ID:</span>
	// 				<span>{strategy.runeId}</span>
	// 			</div>
	// 		</Shell>
	// 	)
	// }
}

export function Strategies({ spaceId }: { spaceId: number }) {
	const {
		data: strategies,
		isLoading,
		isError,
	} = useStrategiesBySpace({ spaceId })

	const Shell = useCallback(
		({ children }: { children: React.ReactNode }) => (
			<div className="space-y-8">
				<div className="flex justify-between w-full items-center">
					<h1 className="text-2xl font-semibold">Strategies</h1>
					<Link href={`/space/strategy/create?spaceId=${spaceId}`}>
						<Button variant="outline">Add Strategy</Button>
					</Link>
				</div>
				<div className="space-y-4">{children}</div>
			</div>
		),
		[spaceId],
	)

	if (isError) return <Shell>An error has occurred</Shell>

	if (isLoading) {
		return (
			<Shell>
				<StrategyCard isLoading />
				<StrategyCard isLoading />
				<StrategyCard isLoading />
			</Shell>
		)
	}

	if (!strategies?.length) return <Shell>No strategies found</Shell>

	return (
		<Shell>
			{strategies.map((strategy) => (
				<StrategyCard key={strategy.id} strategy={strategy} />
			))}
		</Shell>
	)
}
