import React from 'react'

import { SpaceCard } from './space-card'
import { useBreakpoint } from '../lib/hooks/useBreakpoint'
import { SkeletonBox } from '~/sushi-ui'
import { useIsMounted } from '../lib/hooks/useIsMounted'
import { useSpaces } from '../lib/hooks/backend/use-spaces'

function Shell({ children }: { children: React.ReactNode }) {
	return (
		<div className="gap-12 grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2">
			{children}
		</div>
	)
}

export function SpacesGridLoading() {
	const isMounted = useIsMounted()

	const { isMd } = useBreakpoint('md')
	const { isLg } = useBreakpoint('lg')

	const count = (() => {
		if (!isMounted) return 5 * 4

		if (isLg) return 5 * 4
		if (isMd) return 4 * 4
		return 2 * 4
	})()

	return (
		<Shell>
			{Array.from({ length: count }).map((_, i) => (
				<SkeletonBox
					key={i}
					className="rounded-xl border border-accent h-[197px]"
				/>
			))}
		</Shell>
	)
}

export function SpacesGrid() {
	const { data: spaces, isFetching, isError, refetch } = useSpaces()

	if (isError)
		return (
			<div className="w-full flex justify-center flex-col items-center space-y-1">
				<div>An error has occured.</div>
				<div
					onClick={() => refetch()}
					className="font-semibold text-md text-slate-200 hover:text-slate-50 cursor-pointer"
				>
					Retry.
				</div>
			</div>
		)

	if (isFetching) return <SpacesGridLoading />

	// Should just be a type check
	if (!spaces) return null

	return (
		<Shell>
			{spaces.map((space) => (
				<SpaceCard key={space.id} space={space} />
			))}
		</Shell>
	)
}
