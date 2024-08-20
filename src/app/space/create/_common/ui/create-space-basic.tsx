import { useFormContext } from 'react-hook-form'
import { NewSpace } from '../form/space-form'
import {
	classNames,
	FormControl,
	FormField,
	FormItem,
	FormSection,
	TextField,
} from '~/sushi-ui'
import { useEffect, useState } from 'react'

export function CreateSpaceBasic() {
	const { control } = useFormContext<NewSpace>()

	return (
		<FormSection title="Basic Information" description="">
			<FormField
				control={control}
				name="name"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Title</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the name of the space"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="website_link"
				render={({ field: { onChange, onBlur, name, value } }) => (
					<FormItem>
						<FormControl>
							<>
								<label htmlFor={name}>Website Link</label>
								<TextField
									type="text"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									placeholder="Enter the website link"
								/>
							</>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="icon_link"
				render={({ field: { onChange, onBlur, name, value } }) => {
					// eslint-disable-next-line
					const [isError, setIsError] = useState(false)

					// eslint-disable-next-line
					useEffect(() => {
						if (value) {
							setIsError(false)
						}
					}, [value])

					return (
						<FormItem>
							<FormControl>
								<>
									<label htmlFor={name}>Icon Link</label>
									<TextField
										type="text"
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										placeholder="Enter a link to the space icon"
									/>
								</>
							</FormControl>
							<div className="pt-4 flex items-center flex-row justify-between">
								<div>Icon Preview</div>
								<div className="h-32 w-32 rounded-xl bg-slate-900">
									{value ? (
										// eslint-disable-next-line
										<img
											alt=""
											src={value}
											width={128}
											height={128}
											className={classNames(isError ? 'hidden' : '')}
											onError={() => setIsError(true)}
										/>
									) : null}
								</div>
							</div>
						</FormItem>
					)
				}}
			/>
		</FormSection>
	)
}
