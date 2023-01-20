import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { MainLayout } from '@/components/layouts/main/MainLayout'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars/src'
import api from '@/api'
import { AuthContext } from '@/hooks/useAuth'
import { formatDate, trimDate } from '@/utils/date-converter'
import { PeriodTypes } from '@/constants/periodTypes'
import { EventsLegend } from '@/components/events-legend/EventsLegend'
import { hashColor } from '@/utils/hash-color'
import { IEvent } from '@/models/event'
import { IEventType } from '@/models/eventType'
import { useFocusEffect } from '@react-navigation/native'

export const MonthCalendar: FC = () => {
	const { token } = useContext(AuthContext)

	const [eventsList, setEventsList] = useState<IEvent[]>([])

	const [eventTypes, setEventTypes] = useState<IEventType[]>([])

	const updateEventTypes = () => {
		return api.events.getEventTypes(token)
			.then(res => {
				setEventTypes(() => res.data.data)
			})
	}

	const updateEventList = (date = new Date()) => {
		return api.events.getEvents({ date: formatDate(date), periodType: PeriodTypes.Month }, token)
			.then(res => {
				setEventsList(() => res.data.data)
			})
	}

	useFocusEffect(
		useCallback(() => {
			updateEventList()
			updateEventTypes()
		}, [])
	)

	const onMonthChange = (date) => {
		updateEventList(new Date(date.dateString))
	}

	const markedDays = useMemo(() => {
		return eventsList.reduce((acc, cur) => {
			const date = trimDate(new Date(cur.date))
			const dot = { key: cur.id, color: hashColor(cur.eventTypeId.toString()) }
			if (acc[date]) {
				acc[date].dots.push(dot)
			} else {
				acc[trimDate(new Date(cur.date))] = {
					dots: [dot]
				}
			}

			return acc
		}, {})
	}, [eventsList])


	return (
		<MainLayout>
			<View>
				<Calendar
					maxDate={trimDate(new Date())}
					markingType={'multi-dot'}
					markedDates={markedDays}
					onMonthChange={month => onMonthChange(month)}
					enableSwipeMonths={true}
					hideArrows={true}
				/>
				<EventsLegend events={eventsList} eventTypes={eventTypes} />
			</View>
		</MainLayout>
	)
}