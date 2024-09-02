import { useFormContext } from 'react-hook-form'
import { NewEvmStrategy, NewStrategy } from '../form/new-strategy-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormSection,
	TextField,
} from '~/sushi-ui'

export function CreateStrategyEvm() {
	const { control } = useFormContext<NewStrategy & { data: NewEvmStrategy }>()

	return (
		<FormSection title="Evm Options" description="">
			<FormField
				control={control}
				name="data.chain_id"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Chain ID</label>
								<TextField
									type="number"
									value={value ? Number(value) : ''}
									onValueChange={(val) => onChange(BigInt(val))}
									onBlur={onBlur}
									placeholder="Enter the Chain ID the strategy will be deployed on"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="data.contract_address"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Address</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the address of the strategy"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="data.bytecode"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Calldata</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the calldata the strategy will be called with"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
		</FormSection>
	)
}
