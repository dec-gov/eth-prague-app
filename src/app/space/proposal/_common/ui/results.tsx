import { Card, CardContent, CardHeader } from "~/sushi-ui/components/card";
import { useMemo } from "react";
import {
	ProposalOption,
	ProposalOptionVote,
} from "~/app/_common/lib/declarations/decgov_backend.did";

interface ResultsProps {
	options: ProposalOption[];
	optionVotes: ProposalOptionVote[];
}

export function Results({ options, optionVotes }: ResultsProps) {
	const totalPower = useMemo(
		() => optionVotes.reduce((acc, vote) => acc + vote.voting_power, 0n),
		[optionVotes],
	);

	const optionsWithVotes = useMemo(() => {
		return options.map((option) => {
			const optionPower = optionVotes.reduce((acc, vote) => {
				if (vote.option_id === option.id) {
					return acc + vote.voting_power;
				}
				return acc;
			}, 0n);

			let percentage = 0;

			if (totalPower !== 0n) {
				percentage = (Number(optionPower) / Number(totalPower)) * 100;
			}

			return {
				name: option.name,
				power: optionPower,
				percentage,
			};
		});
	}, [optionVotes, options, totalPower]);

	return (
		<Card className="h-fit w-full">
			<CardHeader>
				<h2 className="text-lg">Results</h2>
			</CardHeader>
			<CardContent>
				{optionsWithVotes.map((option) => (
					<div className="flex justify-between" key={option.name}>
						<div className="font-semibold">{option.name}</div>
						<div>{option.percentage.toFixed(2)}%</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
