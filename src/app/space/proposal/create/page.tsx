'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { decgov_backend } from '~/app/_common/lib/declarations'
import { Proposal } from '~/app/_common/lib/declarations/decgov_backend.did'
import { Button } from '~/sushi-ui'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { CreateProposalOptions } from './_common/ui/create-proposal-options'
import {
	NewProposal,
	OptionType,
	ProposalMechanism,
} from './_common/form/proposal-form'
import { CreateProposalBasic } from './_common/ui/create-proposal-basic'
import { CreateProposalMechanism } from './_common/ui/create-proposal-mechanism'

export default function CreateProposal() {
	const form = useForm<NewProposal>({
		defaultValues: {
			mechanism: ProposalMechanism.SINGLE,
			options: [
				{
					type: OptionType.Simple,
				},
			],
		},
	})

	const optionArray = useFieldArray({
		name: 'options',
		control: form.control,
	})

	const params = useSearchParams()
	const router = useRouter()

	const { mutateAsync: createProposal } = useMutation<
		Proposal,
		Error,
		NewProposal
	>({
		mutationKey: ['createProposal'],
		mutationFn: async ({ title, description, mechanism, spaceId, options }) => {
			const [result] = await decgov_backend.insert_proposal(
				spaceId,
				title,
				description,
				mechanism,
				options,
			)

			if (result) {
				return result
			}

			throw new Error('Failed to create proposal')
		},
	})

	const { title, description, mechanism, options } = form.watch()

	const _createProposal = useCallback(async () => {
		const _mechanism = mechanism === ProposalMechanism.SINGLE ? 0 : 1

		const proposal = await createProposal({
			title,
			description,
			mechanism: _mechanism,
			spaceId: Number(params.get('spaceId')),
			options,
		})

		router.push(
			`/space/proposal?spaceId=${params.get('spaceId')}&proposalId=${
				proposal.id
			}`,
		)
	}, [description, mechanism, createProposal, params, router, title, options])

	return (
		<FormProvider {...form}>
			<div className="w-full flex justify-center">
				<div className="max-w-3xl w-full space-y-6">
					<h1 className="text-2xl font-semibold">Create Proposal</h1>
					<div>
						<CreateProposalBasic />
						<CreateProposalMechanism />
						<CreateProposalOptions fieldArray={optionArray} />
					</div>
					<div className="flex w-full justify-end gap-4">
						<Button
							variant="outline"
							onClick={() =>
								optionArray.append({ name: '', type: OptionType.Simple })
							}
						>
							Add Option
						</Button>
						<Button onClick={_createProposal}>Create</Button>
					</div>
				</div>
			</div>
		</FormProvider>
	)
}
