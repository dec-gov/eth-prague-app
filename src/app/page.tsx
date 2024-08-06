"use client";

import { useSpaces } from "~/app/_common/lib/hooks/use-spaces";
import { SpacesGrid } from "./_common/ui/space-grid";

export default function HomePage() {
	const { data: spaces, isInitialLoading } = useSpaces();

	if (!spaces || isInitialLoading) return <div>Loading...</div>;

	return (
		<main className="">
			<SpacesGrid spaces={spaces} />
		</main>
	);
}
