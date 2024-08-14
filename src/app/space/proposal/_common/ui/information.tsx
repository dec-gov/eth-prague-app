import { Card, CardContent, CardHeader } from "~/sushi-ui/components/card";
import formatDate from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import {
	Proposal,
	Space,
} from "~/app/_common/lib/declarations/decgov_backend.did";

interface InformationProps {
	space: Space;
	proposal: Proposal;
}

export function Information({ space, proposal }: InformationProps) {
	const createdAtDate = new Date(proposal.date_created * 1000);
	const createdAt = formatDate(createdAtDate, "HH:mm dd/MM/yyyy");

	const endsAtDate = new Date(
		(proposal.date_created + space.vote_duration) * 1000,
	);
	const endsAt = formatDate(endsAtDate, "HH:mm dd/MM/yyyy");
	const endsIn = formatDistance(endsAtDate, new Date(), { addSuffix: true });

	return (
		<Card className="h-fit w-full">
			<CardHeader>
				<h2 className="text-lg">Information</h2>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between">
					<div className="font-semibold">Voting system</div>
					<div>{proposal.mechanism}</div>
				</div>
				<div className="flex justify-between">
					<div className="font-semibold">Created</div>
					<div>{createdAt}</div>
				</div>
				<div className="flex justify-between">
					<div className="font-semibold">Ends</div>
					<div>{endsAt}</div>
				</div>
				<div className="flex justify-between">
					<div className="font-semibold">Ends in</div>
					<div>{endsIn}</div>
				</div>
			</CardContent>
		</Card>
	);
}
