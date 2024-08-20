import { useFormContext } from 'react-hook-form'
import { NewProposal, ProposalMechanism } from '../form/proposal-form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	FormField,
	FormSection,
} from '~/sushi-ui'

export function CreateProposalMechanism() {
	const { control } = useFormContext<NewProposal>()

	return (
		<FormSection title="Mechanism" description="">
			<FormField
				control={control}
				name="mechanism"
				render={({ field: { onChange, value } }) => (
					<>
						<Select
							value={String(value)}
							onValueChange={(value) =>
								onChange(Number(value) as ProposalMechanism)
							}
						>
							<SelectTrigger className="flex justify-between w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={String(ProposalMechanism.SINGLE)}>
									Single
								</SelectItem>
								<SelectItem value={String(ProposalMechanism.MULTIPLE)}>
									Multiple
								</SelectItem>
							</SelectContent>
						</Select>
					</>
				)}
			/>
		</FormSection>
	)
}
