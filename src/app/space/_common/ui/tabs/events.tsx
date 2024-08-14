"use client";

import Link from "next/link";
import { useState } from "react";
import { useEventsBySpace } from "~/app/_common/lib/hooks/use-events-by-space";
import { type Event } from "~/app/_common/types/events";
import { Space } from "~/app/_common/types/spaces";
import { Button, Collapsible } from "~/sushi-ui";
import { Card, CardContent, CardHeader } from "~/sushi-ui/components/card";

function Event({ event }: { event: Event }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div>
			<Card>
				<CardHeader>
					<h2 className="text-lg">{event.eventType}</h2>
				</CardHeader>
				<CardContent>
					<div className="flex justify-between w-full space-x-4">
						<div>Webhook</div>
						<div className="text-right">{event.webhookUrl}</div>
					</div>
					<div className="w-full space-y-1">
						<div className="flex justify-between w-full">
							<div>Payload</div>
							<div
								onClick={() => setIsExpanded(!isExpanded)}
								className="cursor-pointer text-blue"
							>
								{isExpanded ? "Hide" : "Show"}
							</div>
						</div>
						<Collapsible open={isExpanded}>
							<p className="text-sm text-slate-200 px-2">{event.payload}</p>
						</Collapsible>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export function Events({ space }: { space: Space }) {
	const { data: events, isInitialLoading } = useEventsBySpace(space.id);

	if (!events || isInitialLoading) return <div>Loading...</div>;

	return (
		<div className="space-y-8">
			<div className="flex justify-between w-full items-center">
				<h1 className="text-2xl font-semibold">Events</h1>
				<Link href={`/space/event/create?spaceId=${space.id}`}>
					<Button variant="outline">Add Event</Button>
				</Link>
			</div>
			<div className="space-y-4">
				{events.map((event) => (
					<Event key={event.id} event={event} />
				))}
			</div>
		</div>
	);
}
