import { useQuery } from "@tanstack/react-query";
import { Strategy, dummyStrategies } from "~/app/_common/types/strategies";

export function useStrategiesBySpace(
	_spaceId: number | string | null | undefined,
) {
	const spaceId =
		_spaceId !== null && _spaceId !== undefined ? Number(_spaceId) : null;

	return useQuery<Strategy[]>({
		queryKey: ["strategies-by-space", spaceId],
		queryFn: async () => {
			// const [evmResult, btcResult] = await Promise.all([
			//   backendActor.get_all_evm_strategies_by_space_id({
			//     id: spaceId!
			//   }),
			//   backendActor.get_all_btc_strategies_by_space_id({
			//     id: spaceId!
			//   })
			// ])
			// const evmData = parseDfinityResult(evmResult)
			// const evmStrategies: EvmStrategy[] = z
			//   .array(evmStrategySchema)
			//   .parse(evmData)

			// const btcData = parseDfinityResult(btcResult)
			// const btcStrategies: BtcStrategy[] = z
			//   .array(btcStrategySchema)
			//   .parse(btcData)

			// return [...evmStrategies, ...btcStrategies]
			return dummyStrategies;
		},
		enabled: typeof spaceId === "number",
	});
}
