import { request, Token } from '@/api/request'
import {
	ICreateEventRequest,
	ICreateEventTypeRequest,
	IGetEventsRequest
} from '@/api/events/events.models'
import { IEvent } from '@/models/event'
import { IEventType } from '@/models/eventType'

export default {
	getEvents(data: IGetEventsRequest, token: Token) {
		return request<{ data: IEvent[] }>({
			url: 'api/v1/events/list',
			method: 'POST',
			token,
			data
		})
	},
	createEvent(data: ICreateEventRequest, token: Token) {
		return request({
			url: 'api/v1/events',
			method: 'POST',
			token,
			data
		})
	},
	createEventType(data: ICreateEventTypeRequest, token: Token) {
		return request({
			url: 'api/v1/events/types',
			method: 'POST',
			token,
			data
		})
	},
	getEventTypes(token: Token) {
		return request<{ data: IEventType[] }>({
			url: 'api/v1/events/types',
			method: 'GET',
			token
		})
	}
}
