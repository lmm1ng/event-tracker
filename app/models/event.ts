import { IEventResponse } from '@/api/events/events.models'

export interface IEvent extends IEventResponse {
	eventTypeColor: string
}
