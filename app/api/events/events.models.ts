export interface ICreateEventTypeRequest {
	isVisible: boolean
	name: string
}

export interface ICreateEventRequest {
	date: string
	eventTypeId: number
}

export interface IGetEventsRequest {
	date: string
	periodType: number
	typeId?: number
	userId?: number
}

export interface IEventResponse {
	createdAt: string
	date: string
	deletedAt: string
	eventTypeId: number
	id: number
	updatedAt: string
	userId: number
}

export interface IEventTypeResponse {
	createdAt: string
	deletedAt: string
	eventType: string
	id: number
	isVisible: boolean
	updatedAt: string
	userId: number
}

export interface IFeedElementResponse {
	createdAt: string
	date: string
	eventType: string
	eventTypeId: number
	eventId: number
	userId: number
}
