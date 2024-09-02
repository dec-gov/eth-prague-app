'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button, useForm } from '~/sushi-ui'
import { NewStrategy } from './_common/form/new-strategy-form'
import { Strategy } from '~/app/_common/lib/declarations/decgov_backend.did'
import { decgov_backend } from '~/app/_common/lib/declarations'
import { FormProvider } from 'react-hook-form'
import { CreateStrategyBasic } from './_common/ui/create-strategy-basic'
import { CreateStrategyEvm } from './_common/ui/create-strategy-evm'

export default function CreateStrategy() {
	const form = useForm<NewStrategy>({
		defaultValues: {
			name: '',
			description: '',
			data: { strategy_type: 'evm', bytecode: '', contract_address: '' },
		},
	})

	const params = useSearchParams()
	const router = useRouter()

	const { mutate } = useMutation<Strategy, Error, NewStrategy>({
		mutationKey: ['createStrategy'],
		mutationFn: async ({ spaceId, name, description, data }) => {
			let strategy: Strategy | undefined

			if (data.strategy_type === 'evm') {
				const [result] = await decgov_backend.insert_evm_strategy(
					spaceId,
					name,
					description,
					{ ...data, strategy_id: 0 },
				)

				strategy = result
			} else {
			}

			if (strategy) {
				return strategy
			}

			throw new Error('Failed to create strategy')
		},
		onSuccess: () => {
			router.push(`/space?spaceId=${params.get('spaceId')}`)
		},
	})

	const createStrategy = useCallback(() => {
		const values = form.getValues()

		mutate({
			...values,
			spaceId: Number(params.get('spaceId')),
		})
	}, [form, mutate, params])

	const strategyType = form.watch('data.strategy_type')

	console.log(form.watch())

	return (
		<FormProvider {...form}>
			<div className="w-full flex justify-center">
				<div className="max-w-3xl w-full space-y-6">
					<h1 className="text-2xl font-semibold">Create Strategy</h1>
					<div>
						<CreateStrategyBasic />
						{strategyType === 'evm' && <CreateStrategyEvm />}
					</div>
					<div className="flex w-full justify-end">
						<Button
							variant="outline"
							className="w-2/5"
							onClick={createStrategy}
						>
							Create
						</Button>
					</div>
				</div>
			</div>
		</FormProvider>
	)
}
