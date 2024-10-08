'use client'

import defaultTheme from 'tailwindcss/defaultTheme'

import { useMediaQuery } from 'react-responsive'

export function useBreakpoint<K extends keyof typeof defaultTheme.screens>(
	breakpointKey: K,
) {
	const bool = useMediaQuery({
		query: `(min-width: ${defaultTheme.screens[breakpointKey]})`,
	})
	const capitalizedKey =
		(breakpointKey[0] || 'x').toUpperCase() + breakpointKey.substring(1)
	type Key = `is${Capitalize<K>}`
	return {
		[`is${capitalizedKey}`]: bool,
	} as Record<Key, boolean>
}
