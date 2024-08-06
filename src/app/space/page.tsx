"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProposalsBySpace } from "~/app/_common/lib/hooks/use-proposals-by-space";
import { useSpace } from "~/app/_common/lib/hooks/useSpace";
import { useStrategiesBySpace } from "~/app/_common/lib/hooks/useStrategiesBySpace";
import { Sidebar } from "./_common/ui/sidebar";
import { Events } from "./_common/ui/tabs/events";
import { Proposals } from "./_common/ui/tabs/proposals";
import { Strategies } from "./_common/ui/tabs/strategies";

const tabs = ["Proposals", "Strategies", "Events"] as const;

export default function SpacePage() {
	const [currentTab, setTab] = useState<(typeof tabs)[number]>(tabs[0]);
	const [isMounted, setIsMounted] = useState(false);

	const params = useSearchParams();

	const { data: space, isInitialLoading: isSpaceLoading } = useSpace(
		params.get("spaceId"),
	);
	const { data: proposals, isInitialLoading: isProposalsLoading } =
		useProposalsBySpace(params.get("spaceId"));
	const { data: strategies, isInitialLoading: isStrategiesLoading } =
		useStrategiesBySpace(params.get("spaceId"));

	useEffect(() => {
		if (typeof window !== "undefined") {
			window;
			setIsMounted(true);
		}
	}, []);

	if (!isMounted || isSpaceLoading || isProposalsLoading || isStrategiesLoading)
		return <div>Loading...</div>;

	if (!space) return <div>Space not found</div>;
	if (!proposals) return <div>Proposals not found</div>;
	if (!strategies) return <div>Strategies not found</div>;

	return (
		<div className="grid grid-cols-5 gap-8 w-full">
			<Sidebar
				space={space}
				currentTab={currentTab}
				setTab={setTab}
				tabs={tabs}
			/>
			<div className="col-span-4">
				<div />
				{currentTab === "Proposals" ? (
					<Proposals space={space} proposals={proposals} />
				) : null}
				{currentTab === "Strategies" ? (
					<Strategies strategies={strategies} />
				) : null}
				{currentTab === "Events" ? <Events space={space} /> : null}
			</div>
		</div>
	);
}