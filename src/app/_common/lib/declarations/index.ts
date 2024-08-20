import {
	type ActorSubclass,
	type HttpAgentOptions,
	type ActorConfig,
	type Agent,
	HttpAgent,
	Actor,
} from '@dfinity/agent'

import { _SERVICE } from './decgov_backend.did'

// Imports and re-exports candid interface
import { idlFactory } from './decgov_backend.did.js'
export { idlFactory } from './decgov_backend.did.js'

export const canisterId = process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID

if (!canisterId) {
	throw new Error(
		'Please provide the backend canister URL in the NEXT_PUBLIC_BACKEND_CANISTER_ID environment variable',
	)
}

export declare interface CreateActorOptions {
	/**
	 * @see {@link Agent}
	 */
	agent?: Agent
	/**
	 * @see {@link HttpAgentOptions}
	 */
	agentOptions?: HttpAgentOptions
	/**
	 * @see {@link ActorConfig}
	 */
	actorOptions?: ActorConfig
}

/**
 * Intializes an {@link ActorSubclass}, configured with the provided SERVICE interface of a canister.
 * @constructs {@link ActorSubClass}
 * @param {CreateActorOptions} options - see {@link CreateActorOptions}
 * @param {CreateActorOptions["agent"]} options.agent - a pre-configured agent you'd like to use. Supercedes agentOptions
 * @param {CreateActorOptions["agentOptions"]} options.agentOptions - options to set up a new agent
 * @see {@link HttpAgentOptions}
 * @param {CreateActorOptions["actorOptions"]} options.actorOptions - options for the Actor
 * @see {@link ActorConfig}
 */
export const createActor = (
	options: CreateActorOptions = {},
): ActorSubclass<_SERVICE> => {
	const agent = options.agent || new HttpAgent({ ...options.agentOptions })

	if (options.agent && options.agentOptions) {
		console.warn(
			'Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.',
		)
	}

	// Fetch root key for certificate validation during development
	if (process.env.DFX_NETWORK !== 'ic') {
		agent.fetchRootKey().catch((err: unknown) => {
			console.warn(
				'Unable to fetch root key. Check to ensure that your local replica is running',
			)
			console.error(err)
		})
	}

	// Creates an actor with using the candid interface and the HttpAgent
	return Actor.createActor(idlFactory, {
		agent,
		canisterId,
		...options.actorOptions,
	})
}

export const decgov_backend: ActorSubclass<_SERVICE> = createActor({
	agentOptions: {
		host: process.env.NEXT_PUBLIC_BACKEND_CANISTER_URL,
		retryTimes: 1,
	},
})
