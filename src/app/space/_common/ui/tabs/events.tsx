'use client'

import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { Event } from '~/app/_common/lib/declarations/decgov_backend.did'
import { useEventsBySpace } from '~/app/_common/lib/hooks/backend/use-events-by-space'
import {
	EventTrigger,
	getEventTrigger,
	isWebhookEvent,
} from '~/app/_common/types/events'
import { XOR } from '~/app/_common/types/xor'
import { Button, Collapsible, SkeletonText } from '~/sushi-ui'
import { Card, CardContent, CardHeader } from '~/sushi-ui/components/card'

function EventCard({
	event,
	isLoading,
}: XOR<{ event: Event }, { isLoading: true }>) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<SkeletonText fontSize="lg" />
				</CardHeader>
				<CardContent>
					<div className="flex justify-between w-full space-x-4">
						<div>Webhook</div>
						<div className="text-right w-1/2">
							<SkeletonText />
						</div>
					</div>
					<div className="w-full space-y-1">
						<div className="flex justify-between w-full">
							<div>Payload</div>
							<div
								onClick={() => setIsExpanded(!isExpanded)}
								className="cursor-pointer text-blue"
							>
								{isExpanded ? 'Hide' : 'Show'}
							</div>
						</div>
						<Collapsible open={isExpanded}>
							<p className="text-sm text-slate-200 px-2">
								<SkeletonText />
								<SkeletonText />
							</p>
						</Collapsible>
					</div>
				</CardContent>
			</Card>
		)
	}

	if (isWebhookEvent(event)) {
		return (
			<Card>
				<CardHeader>
					<h2 className="text-lg">
						{EventTrigger[getEventTrigger(event.event_trigger)]}
					</h2>
				</CardHeader>
				<CardContent>
					<div className="flex justify-between w-full space-x-4">
						<div>Webhook</div>
						<div className="text-right">{event.data.Webhook.webhook_url}</div>
					</div>
					<div className="w-full space-y-1">
						<div className="flex justify-between w-full">
							<div>Payload</div>
							<div
								onClick={() => setIsExpanded(!isExpanded)}
								className="cursor-pointer text-blue"
							>
								{isExpanded ? 'Hide' : 'Show'}
							</div>
						</div>
						<Collapsible open={isExpanded}>
							<p className="text-sm text-slate-200 px-2">
								{event.data.Webhook.payload}
							</p>
						</Collapsible>
					</div>
				</CardContent>
			</Card>
		)
	}
}

export function Events({ spaceId }: { spaceId: number }) {
	const {
		data: events,
		isLoading,
		isError,
	} = useEventsBySpace({
		spaceId,
	})

	const Shell = useCallback(
		({ children }: { children: React.ReactNode }) => (
			<div className="space-y-8">
				<div className="flex justify-between w-full items-center">
					<h1 className="text-2xl font-semibold">Events</h1>
					<Link href={`/space/event/create?spaceId=${spaceId}`}>
						<Button variant="outline">Add Event</Button>
					</Link>
				</div>
				<div className="space-y-4">{children}</div>
			</div>
		),
		[spaceId],
	)

	if (isError) return <Shell>An error has occurred</Shell>

	if (isLoading) {
		return (
			<Shell>
				<EventCard isLoading />
				<EventCard isLoading />
				<EventCard isLoading />
			</Shell>
		)
	}

	if (!events?.length) return <Shell>No events found</Shell>

	return (
		<Shell>
			{events.map((event, i) => (
				<EventCard key={i} event={event} />
			))}
		</Shell>
	)
}
