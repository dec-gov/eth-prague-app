import numbro from 'numbro'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/sushi-ui'

export function VotingPower({ power }: { power: bigint }) {
	let num: string
	let unit: string

	if (power >= 1e18) {
		num = numbro(String(power / BigInt(1e18))).format('0.00a')
		unit = '10^18'
	} else if (power >= 1e12) {
		num = numbro(String(power / BigInt(1e12))).format('0.00a')
		unit = '10^12'
	} else if (power >= 1e6) {
		num = numbro(String(power / BigInt(1e6))).format('0.00a')
		unit = '10^6'
	} else {
		num = numbro(String(power)).format('0.00a')
		unit = ''
	}

	return (
		<HoverCard openDelay={0} closeDelay={0}>
			<HoverCardTrigger>
				<div className="flex space-x-2 items-center">
					<div>{num}</div>
					<div className="text-gray-400 text-xs">{unit}</div>
				</div>
			</HoverCardTrigger>
			<HoverCardContent>
				<div className="space-y-2">
					<div>{String(power).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}
