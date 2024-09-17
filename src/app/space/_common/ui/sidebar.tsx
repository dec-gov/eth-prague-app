import classNames from 'classnames'
import { Space } from '~/app/_common/lib/declarations/decgov_backend.did'
import { Card, CardContent, CardHeader } from '~/sushi-ui/components/card'

interface SidebarProps<T extends Readonly<string[]>> {
	space: Space
	setTab: (tab: T[number]) => void
	currentTab: T[number]
	tabs: T
}

export function Sidebar<T extends Readonly<string[]>>({
	space,
	currentTab,
	setTab,
	tabs,
}: SidebarProps<T>) {
	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<a href={space.website_link} target="_blank" rel="noreferrer">
						<div className="flex flex-row items-center w-full justify-between flex-wrap gap-4">
							<h2 className="text-lg select-none font-semibold break-before-all">
								{space.name}
							</h2>
							<div className="flex-grow flex justify-end">
								<img
									alt={space.name}
									src={space.icon_link}
									width={32}
									height={32}
								/>
							</div>
						</div>
					</a>
				</CardHeader>
			</Card>
			<Card>
				<CardContent>
					<div className="space-y-4 pt-5">
						{tabs.map((tab) => (
							<div
								key={tab}
								onClick={() => setTab(tab)}
								className={classNames(
									tab === currentTab && 'font-semibold !text-slate-200',
									'cursor-pointer text-slate-400 hover:text-slate-100 select-none',
								)}
							>
								{tab}
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
