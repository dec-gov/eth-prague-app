import { useFormContext } from 'react-hook-form'
import { NewEvent, NewEvmEvent, NewWebhookEvent } from '../form/event-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormSection,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/sushi-ui'
import { EventTrigger, EventTriggerKey } from '~/app/_common/types/events'

export function CreateEventBasic() {
	const { control } = useFormContext<NewEvent>()

	return (
		<FormSection title="Basic Information" description="">
			<FormField
				control={control}
				name="eventTrigger"
				render={({ field: { onChange, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Event Trigger</label>
								<Select
									value={String(value)}
									onValueChange={(value) => onChange(value as EventTriggerKey)}
								>
									<SelectTrigger className="flex justify-between w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={EventTrigger.Vote}>On Vote</SelectItem>
										<SelectItem value={EventTrigger.ProposalCreated}>
											On Proposal Created
										</SelectItem>
										<SelectItem value={EventTrigger.ProposalEnded}>
											On Proposal Ended
										</SelectItem>
									</SelectContent>
								</Select>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="data.event_type"
				render={({ field: { onChange, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Event Type</label>
								<Select
									value={String(value)}
									onValueChange={(value) => onChange(value)}
								>
									<SelectTrigger className="flex justify-between w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem
											value={'webhook' as NewWebhookEvent['event_type']}
										>
											Webhook
										</SelectItem>
										<SelectItem value={'evm' as NewEvmEvent['event_type']}>
											Evm
										</SelectItem>
									</SelectContent>
								</Select>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
		</FormSection>
	)
}
