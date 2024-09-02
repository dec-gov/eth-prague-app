'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { decgov_backend } from '~/app/_common/lib/declarations'
import { Space } from '~/app/_common/lib/declarations/decgov_backend.did'
import { Button } from '~/sushi-ui'
import { useForm, FormProvider } from 'react-hook-form'
import { NewSpace } from './_common/form/space-form'
import { CreateSpaceBasic } from './_common/ui/create-space-basic'
import { CreateSpaceVoteSettings } from './_common/ui/create-space-vote-settings'
import { CreateSpaceAdministration } from './_common/ui/create-space-administration'

export default function CreateSpace() {
	const form = useForm<NewSpace>({
		defaultValues: {},
	})

	const router = useRouter()

	const { mutateAsync: createSpace } = useMutation<Space, Error, NewSpace>({
		mutationKey: ['createSpace'],
		mutationFn: async ({
			name,
			icon_link,
			website_link,
			owner_address,
			vote_delay,
			vote_duration,
			min_vote_power,
			quorum,
		}) => {
			const result = await decgov_backend.insert_space(
				name,
				icon_link,
				website_link,
				owner_address,
				vote_delay,
				vote_duration,
				0,
				min_vote_power,
				quorum,
			)

			if (result) {
				return result
			}

			throw new Error('Failed to create proposal')
		},
	})

	const {
		name,
		icon_link,
		website_link,
		owner_address,
		vote_delay,
		vote_duration,
		min_vote_power,
		quorum,
	} = form.watch()

	const _createSpace = useCallback(async () => {
		const space = await createSpace({
			name,
			icon_link,
			website_link,
			owner_address,
			vote_delay,
			vote_duration,
			min_vote_power,
			quorum,
		})

		router.push(
			`/space?spaceId=${space.id}
		`,
		)
	}, [
		createSpace,
		icon_link,
		min_vote_power,
		name,
		quorum,
		router,
		vote_delay,
		vote_duration,
		website_link,
		owner_address,
	])

	return (
		<FormProvider {...form}>
			<div className="w-full flex justify-center">
				<div className="max-w-3xl w-full space-y-6">
					<h1 className="text-2xl font-semibold">Create Space</h1>
					<div>
						<CreateSpaceBasic />
						<CreateSpaceAdministration />
						<CreateSpaceVoteSettings />
					</div>
					<div className="flex w-full justify-end gap-4">
						<Button onClick={_createSpace}>Create</Button>
					</div>
				</div>
			</div>
		</FormProvider>
	)
}
