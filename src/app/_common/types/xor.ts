export type XOR<T, U> = T | U extends object
	? T extends object
		? U extends object
			?
					| (T & Partial<Record<keyof U, never>>)
					| (U & Partial<Record<keyof T, never>>)
			: T
		: U
	: T | U
