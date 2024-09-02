'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button, useForm } from '~/sushi-ui'
import { NewEvent } from './_common/form/event-form'
import { Event } from '~/app/_common/lib/declarations/decgov_backend.did'
import { decgov_backend } from '~/app/_common/lib/declarations'
import { EventTrigger, EventTriggerKey } from '~/app/_common/types/events'
import { FormProvider } from 'react-hook-form'
import { CreateEventBasic } from './_common/ui/create-event-basic'
import { CreateEventWebhook } from './_common/ui/create-event-webhook'

export default function CreateEvent() {
	const form = useForm<NewEvent>({
		defaultValues: {
			eventTrigger: EventTrigger.Vote,
			data: { event_type: 'webhook' },
		},
	})

	const params = useSearchParams()
	const router = useRouter()

	const { mutate } = useMutation<Event, Error, NewEvent>({
		mutationKey: ['createEvent'],
		mutationFn: async ({ spaceId, eventTrigger, data }) => {
			const event_trigger = { [eventTrigger]: null } as {
				[key in EventTriggerKey]: null
			}

			let event: Event | undefined

			if (data.event_type === 'webhook') {
				const [result] = await decgov_backend.insert_event(
					spaceId,
					event_trigger,
					{
						Webhook: data,
					},
				)

				event = result
			} else {
				const [result] = await decgov_backend.insert_event(
					spaceId,
					event_trigger,
					{
						Evm: data,
					},
				)

				event = result
			}

			if (event) {
				return event
			}

			throw new Error('Failed to create event')
		},
		onSuccess: () => {
			router.push(`/space?spaceId=${params.get('spaceId')}`)
		},
	})

	const createEvent = useCallback(() => {
		const values = form.getValues()

		mutate({
			...values,
			spaceId: Number(params.get('spaceId')),
		})
	}, [form, mutate, params])

	const eventType = form.watch('data.event_type')

	return (
		<FormProvider {...form}>
			<div className="w-full flex justify-center">
				<div className="max-w-3xl w-full space-y-6">
					<h1 className="text-2xl font-semibold">Create Event</h1>
					<div>
						<CreateEventBasic />
						{eventType === 'webhook' && <CreateEventWebhook />}
					</div>
					<div className="flex w-full justify-end">
						<Button variant="outline" className="w-2/5" onClick={createEvent}>
							Create
						</Button>
					</div>
				</div>
			</div>
		</FormProvider>
	)
}
