export interface ICreateEventTypeRequest {
	isVisible: boolean,
	name: string
}

export interface ICreateEventRequest {
	date: string,
	eventTypeId: number
}

export interface IGetEventsRequest {
	date: string
	periodType: number
	typeId?: number
	userId?: number
}