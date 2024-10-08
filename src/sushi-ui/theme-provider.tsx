'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { FC, ReactNode } from 'react'

import { OnramperProvider } from './components/onramper'

interface ThemeProviderProps {
	children: ReactNode | ReactNode[]
	forcedTheme?: string
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
	children,
	forcedTheme,
}) => {
	return (
		<NextThemeProvider
			attribute="class"
			disableTransitionOnChange
			forcedTheme={forcedTheme}
		>
			<OnramperProvider>
				<div id="network-check-portal" />
				{children}
				<div id="popover-portal" />
				<div id="footer-portal" />
			</OnramperProvider>
		</NextThemeProvider>
	)
}
