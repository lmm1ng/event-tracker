import { EventsLegend } from '@/components/events-legend/EventsLegend'
import { UICalendar } from '@/components/ui/calendar/UI-calendar'
import { useEventTypes } from '@/hooks/queries/useEventTypes'
import { useMonthEvents } from '@/hooks/queries/useEvents'
import { IEvent } from '@/models/event'
import { trimDate } from '@/utils/date-converter'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useMemo, useState } from 'react'
import { DateData } from 'react-native-calendars/src'

export const MonthCalendar: FC = () => {
	const [currentDate, setCurrentDate] = useState(new Date())

	const { data: events, refetch: refetchEvents } = useMonthEvents(currentDate)
	const { data: eventTypes } = useEventTypes()

	useFocusEffect(
		useCallback(() => {
			refetchEvents()
		}, [])
	)

	const onMonthChange = (date: DateData) => {
		setCurrentDate(new Date(date.dateString))
	}

	const markedDays = useMemo(() => {
		return events.reduce((acc, cur) => {
			const date = trimDate(new Date(cur.date))
			const dot = { key: cur.id, color: cur.eventTypeColor }
			if (acc[date]) {
				acc[date].dots.push(dot)
			} else {
				acc[trimDate(new Date(cur.date))] = {
					dots: [dot]
				}
			}

			return acc
		}, {} as Record<string, { dots: Array<{ key: IEvent['id']; color: string }> }>)
	}, [events])

	return (
		<>
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
				events={events}
				eventTypes={eventTypes}
				showUniq
			/>
		</>
	)
}
