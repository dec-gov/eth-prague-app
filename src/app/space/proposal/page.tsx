"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useOptionsByProposal } from "~/app/_common/lib/hooks/useOptionsByProposal";
import { useProposal } from "~/app/_common/lib/hooks/useProposal";
import { useSpace } from "~/app/_common/lib/hooks/useSpace";
import { useVotesByProposal } from "~/app/_common/lib/hooks/useVotesByProposal";
import { Body } from "./_common/ui/body";
import { Information } from "./_common/ui/information";
import { Results } from "./_common/ui/results";
import { Vote } from "./_common/ui/vote/vote";
import { Votes } from "./_common/ui/votes";

export default function SpacePage() {
	const [isMounted, setIsMounted] = useState(false);

	const params = useSearchParams();

	const { data: space, isInitialLoading: isSpaceLoading } = useSpace(
		params.get("spaceId"),
	);

	const { data: proposal, isInitialLoading: isProposalLoading } = useProposal(
		params.get("proposalId"),
	);

	const {
		data: votes,
		isInitialLoading: isVotesLoading,
		error,
	} = useVotesByProposal(params.get("proposalId"));

	console.log(votes, error);

	const { data: options, isInitialLoading: isOptionsLoading } =
		useOptionsByProposal(params.get("proposalId"));

	useEffect(() => {
		if (typeof window !== "undefined") {
			window;
			setIsMounted(true);
		}
	}, []);

	if (
		!isMounted ||
		isSpaceLoading ||
		isProposalLoading ||
		isVotesLoading ||
		isOptionsLoading
	)
		return <div>Loading...</div>;

	if (!space) return <div>Space not found</div>;
	if (!proposal) return <div>Proposal not found</div>;
	if (!votes) return <div>Votes not found</div>;
	if (!options) return <div>Options not found</div>;

	return (
		<div className="flex justify-center w-full">
			<div className="max-w-4xl space-y-4">
				<h1 className="text-2xl font-semibold">{proposal.title}</h1>
				<div className="grid grid-cols-5 gap-8 w-full">
					<div className="col-span-3 space-y-6">
						<Body content={proposal.description} />
						<Vote space={space} proposal={proposal} options={options} />
						<Votes optionVotes={votes} />
					</div>
					<div className="col-span-2 space-y-6">
						<Information space={space} proposal={proposal} />
						<Results options={options} optionVotes={votes} />
					</div>
				</div>
			</div>
		</div>
	);
}
