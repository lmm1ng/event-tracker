import api from '@/api'
import { EventsLegend } from '@/components/events-legend/EventsLegend'
import { MainLayout } from '@/components/layouts/main/MainLayout'
import { UICalendar } from '@/components/ui/calendar/UI-calendar'
import { PeriodTypes } from '@/constants/periodTypes'
import { AuthContext } from '@/hooks/useAuth'
import { IEvent } from '@/models/event'
import { IEventType } from '@/models/eventType'
import { formatDate, trimDate } from '@/utils/date-converter'
import { hashColor } from '@/utils/hash-color'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useMemo, useState } from 'react'
import { View } from 'react-native'
import { DateData } from 'react-native-calendars/src'

export const MonthCalendar: FC = () => {
	const { token } = useContext(AuthContext)

	const [eventsList, setEventsList] = useState<IEvent[]>([])

	const [eventTypes, setEventTypes] = useState<IEventType[]>([])

	const updateEventTypes = () => {
		return api.events.getEventTypes(token).then(res => {
			setEventTypes(() => res.data)
		})
	}

	const updateEventList = (date = new Date()) => {
		return api.events
			.getEvents(
				{ date: formatDate(date), periodType: PeriodTypes.Month },
				token
			)
			.then(res => {
				setEventsList(() => res.data)
			})
	}

	useFocusEffect(
		useCallback(() => {
			updateEventList()
			updateEventTypes()
		}, [])
	)

	const onMonthChange = (date: DateData) => {
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
		}, {} as Record<string, { dots: Array<{ key: IEvent['id']; color: string }> }>)
	}, [eventsList])

	return (
		<MainLayout>
			<View>
				<UICalendar
					maxDate={trimDate(new Date())}
					markingType={'multi-dot'}
					// lib stuff error
					// @ts-ignore
					markedDates={markedDays}
					onMonthChange={month => onMonthChange(month)}
					enableSwipeMonths={true}
					hideArrows={true}
					style={{ marginBottom: 20 }}
				/>
				<EventsLegend
					events={eventsList}
					eventTypes={eventTypes}
				/>
			</View>
		</MainLayout>
	)
}
