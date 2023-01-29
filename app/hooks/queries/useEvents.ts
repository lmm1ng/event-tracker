import api from '@/api'
import { IEventResponse } from '@/api/events/events.models'
import { PeriodTypes } from '@/constants/periodTypes'
import { AuthContext } from '@/hooks/useAuth'
import { IEvent } from '@/models/event'
import { formatDate } from '@/utils/date-converter'
import { hashColor } from '@/utils/hash-color'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

export const useMonthEvents = (date: Date) => {
	const { token } = useContext(AuthContext)
	return useQuery<IEventResponse[], any, IEvent[]>(
		['events', date],
		() =>
			api.events
				.getEvents({ date: formatDate(date), periodType: PeriodTypes.Month }, token)
				.then(res => res.data),
		{
			initialData: [],
			select: events =>
				events.map(el => ({
					...el,
					eventTypeColor: hashColor(el.eventTypeId.toString())
				}))
		}
	)
}

export const useDayEvents = (date: Date) => {
	const { token } = useContext(AuthContext)
	return useQuery<IEventResponse[], any, IEvent[]>(
		['events', date],
		() =>
			api.events
				.getEvents({ date: formatDate(date), periodType: PeriodTypes.Day }, token)
				.then(res => res.data),
		{
			initialData: [],
			select: events =>
				events.map(el => ({
					...el,
					eventTypeColor: hashColor(el.eventTypeId.toString())
				}))
		}
	)
}
