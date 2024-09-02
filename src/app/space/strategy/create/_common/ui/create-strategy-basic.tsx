import { useFormContext } from 'react-hook-form'
import { NewStrategy } from '../form/new-strategy-form'
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
	TextField,
} from '~/sushi-ui'
import { StrategyType } from '~/app/_common/types/strategies'

export function CreateStrategyBasic() {
	const { control } = useFormContext<NewStrategy>()

	return (
		<FormSection title="Basic Information" description="">
			<FormField
				control={control}
				name="name"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Name</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the name of the strategy"
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
									placeholder="Enter the a short description of the strategy"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="data.strategy_type"
				render={({ field: { onChange, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Strategy Type</label>
								<Select
									value={String(value)}
									onValueChange={(value) => onChange(value)}
								>
									<SelectTrigger className="flex justify-between w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem
											className="cursor-pointer"
											value={StrategyType.EVM}
										>
											Evm
										</SelectItem>
										<SelectItem value={StrategyType.Bitcoin} disabled>
											Bitcoin
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
