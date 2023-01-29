import {
	ICreateEventRequest,
	ICreateEventTypeRequest,
	IEventResponse,
	IEventTypeResponse,
	IFeedElementResponse,
	IGetEventsRequest
} from '@/api/events/events.models'
import { Token, request } from '@/api/request'

export default {
	getEvents(data: IGetEventsRequest, token: Token) {
		return request<IEventResponse[]>({
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
		return request<IEventTypeResponse[]>({
			url: 'api/v1/events/types',
			method: 'GET',
			token
		})
	},
	getFeed(token: Token) {
		return request<IFeedElementResponse[]>({
			url: 'api/v1/events/feed',
			method: 'GET',
			token
		})
	}
}
