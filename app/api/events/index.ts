import {
	ICreateEventRequest,
	ICreateEventTypeRequest,
	IGetEventsRequest
} from '@/api/events/events.models'
import { Token, request } from '@/api/request'
import { IEvent } from '@/models/event'
import { IEventType } from '@/models/eventType'
import { IFeedElement } from '@/models/feed'

export default {
	getEvents(data: IGetEventsRequest, token: Token) {
		return request<IEvent[]>({
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
		return request<IEventType[]>({
			url: 'api/v1/events/types',
			method: 'GET',
			token
		})
	},
	getFeed(token: Token) {
		return request<IFeedElement[]>({
			url: 'api/v1/events/feed',
			method: 'GET',
			token
		})
	}
}
