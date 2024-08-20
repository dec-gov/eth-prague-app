import { useFormContext } from 'react-hook-form'
import { NewProposal } from '../form/proposal-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormSection,
	TextField,
} from '~/sushi-ui'

export function CreateProposalBasic() {
	const { control } = useFormContext<NewProposal>()

	return (
		<FormSection title="Basic Information" description="">
			<FormField
				control={control}
				name="title"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Title</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the proposal title"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="description"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Description</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the proposal description"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
		</FormSection>
	)
}
