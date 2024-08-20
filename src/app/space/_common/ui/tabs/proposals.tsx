import Link from 'next/link'
import {
	Proposal,
	Space,
} from '~/app/_common/lib/declarations/decgov_backend.did'
import { Button } from '~/sushi-ui'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '~/sushi-ui/components/card'

export function Proposals({
	space,
	proposals,
}: {
	space: Space
	proposals: Proposal[]
}) {
	return (
		<div className="space-y-8">
			<div className="flex justify-between w-full items-center">
				<h1 className="text-2xl font-semibold">Proposals</h1>
				<Link href={`/space/proposal/create?spaceId=${space.id}`}>
					<Button variant="outline">Create Proposal</Button>
				</Link>
			</div>
			<div className="space-y-4">
				{proposals.map((proposal) => (
					<div key={proposal.id}>
						<Link
							href={`/space/proposal?spaceId=${space.id}&proposalId=${proposal.id}`}
						>
							<Card>
								<CardHeader>
									<h2 className="text-2xl font-semibold">{proposal.title}</h2>
								</CardHeader>
								<CardContent>
									<p>{proposal.description}</p>
								</CardContent>
								<CardFooter>
									<div className="text-sm text-gray-300">Ends in X days</div>
								</CardFooter>
							</Card>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
