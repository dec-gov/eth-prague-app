import { useFormContext } from 'react-hook-form'
import { NewEvent } from '../form/event-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormSection,
	TextField,
} from '~/sushi-ui'

export function CreateEventWebhook() {
	const { control } = useFormContext<NewEvent>()

	return (
		<FormSection title="Webhook Options" description="">
			<FormField
				control={control}
				name="data.webhook_url"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>URL</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the webhook URL"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="data.payload"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Payload</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the webhook payload"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
		</FormSection>
	)
}
