import { Address } from 'viem'
import { EventTriggerKey } from '~/app/_common/types/events'

export type NewWebhookEvent = {
	event_type: 'webhook'
	webhook_url: string
	payload: string
}

export type NewEvmEvent = {
	event_type: 'evm'
	chain_id: number
	contract_address: Address
	bytecode: string
}

export type NewEvent = {
	spaceId: number
	eventTrigger: EventTriggerKey
	data: NewWebhookEvent | NewEvmEvent
}
