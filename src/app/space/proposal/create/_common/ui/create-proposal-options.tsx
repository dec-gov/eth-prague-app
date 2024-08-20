'use client'

import React from 'react'
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form'
import type { NewProposal } from '../form/proposal-form'
import {
	classNames,
	FormControl,
	FormField,
	FormItem,
	FormSection,
	IconButton,
	Separator,
	TextField,
} from '~/sushi-ui'
import { TrashIcon } from '@heroicons/react/24/solid'

interface SimpleOption {
	optionIndex: number
}

function SimpleOption({ optionIndex }: SimpleOption) {
	const { control } = useFormContext<NewProposal>()

	return (
		<>
			<FormField
				control={control}
				name={`options.${optionIndex}.name`}
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
									placeholder="Enter the option name"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
		</>
	)
}

interface CreateProposalOption {
	fieldArray: UseFieldArrayReturn<NewProposal, 'options', 'id'>
	optionIndex: number
}

function CreateProposalOption({
	fieldArray,
	optionIndex,
}: CreateProposalOption) {
	const { fields, remove } = fieldArray

	const field = fields[optionIndex]

	// Should never happen
	if (!field) return null

	return (
		<div className="flex flex-col gap-1 pb-4">
			<div className="flex justify-between items-center">
				<h1 className="text-xs font-semibold uppercase">{`Option #${
					optionIndex + 1
				}`}</h1>
				<div className="flex items-center gap-5 pr-2">
					<div className={classNames(fields.length > 1 ? '' : 'opacity-0')}>
						<IconButton
							icon={TrashIcon}
							iconProps={{ className: 'text-red' }}
							onClick={() => remove(optionIndex)}
							name="Delete"
						/>
					</div>
				</div>
			</div>
			<FormSection
				title={field.type}
				description="Simple option description lorem ipsum dolor"
			>
				<SimpleOption optionIndex={optionIndex} />
			</FormSection>
		</div>
	)
}

interface CreateProposalOptions {
	fieldArray: UseFieldArrayReturn<NewProposal, 'options', 'id'>
}

export function CreateProposalOptions({ fieldArray }: CreateProposalOptions) {
	const { fields } = fieldArray

	return (
		<div>
			{fields.map((_, i) => (
				<div key={`${fieldArray.fields.length}+${i}`}>
					{i === 0 && <Separator className="mb-3" />}
					<CreateProposalOption fieldArray={fieldArray} optionIndex={i} />
					{i !== fields.length - 1 && <Separator className="my-3" />}
				</div>
			))}
		</div>
	)
}
