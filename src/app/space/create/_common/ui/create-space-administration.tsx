import { useFormContext } from 'react-hook-form'
import { NewSpace } from '../form/space-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormSection,
	TextField,
} from '~/sushi-ui'

export function CreateSpaceAdministration() {
	const { control } = useFormContext<NewSpace>()

	return (
		<FormSection title="Administration" description="">
			<FormField
				control={control}
				name="owner_address"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Owner Address</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the address of the owner"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
		</FormSection>
	)
}
