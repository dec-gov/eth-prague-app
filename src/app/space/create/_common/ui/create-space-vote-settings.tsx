import { useFormContext } from 'react-hook-form'
import { NewSpace } from '../form/space-form'
import {
	FormControl,
	FormItem,
	FormSection,
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	TextField,
	SelectItem,
} from '~/sushi-ui'
import { useEffect, useState } from 'react'

const units = {
	Minutes: 60,
	Hours: 60 * 60,
	Days: 60 * 60 * 24,
} as const

const scales = {
	'1': 1n,
	'1e6': 1000000n,
	'1e12': 1000000000000n,
	'1e18': 1000000000000000000n,
} as const

function VoteDelay() {
	const { setValue: setFormValue } = useFormContext<NewSpace>()

	const [value, setValue] = useState<number>()
	const [unit, setUnit] = useState<keyof typeof units>('Days')

	const name = 'vote_delay'

	useEffect(() => {
		if (value) {
			setFormValue(name, value * units[unit])
		} else {
			setFormValue(name, 0)
		}
	}, [setFormValue, unit, value])

	return (
		<FormItem>
			<FormControl>
				<>
					<label htmlFor={name}>Vote Delay</label>
					<div className="grid gap-4 grid-cols-5">
						<div className="col-span-3">
							<TextField
								type="number"
								value={value || ''}
								onValueChange={(value) => setValue(Number(value))}
								placeholder="1"
							/>
						</div>
						<div className="col-span-2">
							<Select
								value={unit}
								onValueChange={(value) => setUnit(value as keyof typeof units)}
							>
								<SelectTrigger className="flex justify-between w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{Object.keys(units).map((unit) => (
										<SelectItem key={unit} value={unit}>
											{unit}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</>
			</FormControl>
		</FormItem>
	)
}

function VoteDuration() {
	const { setValue: setFormValue } = useFormContext<NewSpace>()

	const [value, setValue] = useState<number>()
	const [unit, setUnit] = useState<keyof typeof units>('Days')

	const name = 'vote_duration'

	useEffect(() => {
		if (value) {
			setFormValue(name, value * units[unit])
		} else {
			setFormValue(name, 0)
		}
	}, [setFormValue, unit, value])

	return (
		<FormItem>
			<FormControl>
				<>
					<label htmlFor={name}>Vote Duration</label>
					<div className="grid gap-4 grid-cols-5">
						<div className="col-span-3">
							<TextField
								type="number"
								value={value || ''}
								onValueChange={(value) => setValue(Number(value))}
								placeholder="3"
							/>
						</div>
						<div className="col-span-2">
							<Select
								value={unit}
								onValueChange={(value) => setUnit(value as keyof typeof units)}
							>
								<SelectTrigger className="flex justify-between w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{Object.keys(units).map((unit) => (
										<SelectItem key={unit} value={unit}>
											{unit}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</>
			</FormControl>
		</FormItem>
	)
}

interface ScaleForm {
	name: keyof NewSpace
	title: string
}

function ScaleForm({ name, title }: ScaleForm) {
	const { setValue: setFormValue } = useFormContext<NewSpace>()

	const [value, setValue] = useState<number>()
	const [scale, setScale] = useState<keyof typeof scales>('1e18')

	useEffect(() => {
		if (value) {
			setFormValue(name, BigInt(value) * scales[scale])
		}
	}, [name, value, scale, setFormValue])

	return (
		<FormItem>
			<FormControl>
				<>
					<label htmlFor={name}>{title}</label>
					<div className="grid gap-4 grid-cols-5">
						<div className="col-span-3">
							<TextField
								type="number"
								value={value}
								onValueChange={(value) => {
									if (value.includes('.') || value.includes(',')) {
										return
									}

									if (value) {
										setValue(Math.floor(Number(value)))
										return
									}

									setValue(undefined)
								}}
								placeholder="1000"
							/>
						</div>
						<div className="col-span-2">
							<Select
								value={scale}
								onValueChange={(value) =>
									setScale(value as keyof typeof scales)
								}
							>
								<SelectTrigger className="flex justify-between w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{Object.keys(scales).map((scale) => (
										<SelectItem key={scale} value={scale}>
											{scale}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</>
			</FormControl>
		</FormItem>
	)
}

export function CreateSpaceVoteSettings() {
	return (
		<FormSection title="Vote Settings" description="">
			<VoteDelay />
			<VoteDuration />
			<ScaleForm name="min_vote_power" title="Minimum Voting Power" />
			<ScaleForm name="quorum" title="Quorum" />
		</FormSection>
	)
}
