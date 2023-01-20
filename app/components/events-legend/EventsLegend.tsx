import { FC, useMemo } from 'react'
import { View, Text, StyleSheet, StyleProp } from 'react-native'
import { Card } from '@rneui/themed'
import { CardTitle } from '@rneui/base/dist/Card/Card.Title'
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider'
import { IEvent } from '@/models/event'
import { hashColor } from '@/utils/hash-color'
import { IEventType } from '@/models/eventType'

interface IEventsLegend {
	events: IEvent[],
	eventTypes: IEventType[],
	variant?: 'normal' | 'big',
	header?: boolean,
}

export const EventsLegend:
	FC<IEventsLegend> =
	({
		 events,
		 eventTypes,
		 variant = 'normal',
		 header = true
	 }) => {
		const eventTypeMap = useMemo(() => {
			return eventTypes.reduce((acc, cur) => {
				acc[cur.id] = cur
				return acc
			}, {})
		}, [eventTypes])

		return (
			<Card>
				{header && (
					<>
						<CardTitle>Events</CardTitle>
						<CardDivider />
					</>
				)}
				<View style={{
					...styles.wrapper,
					flexDirection: variant === 'normal' ? 'row' : 'column'
				}}>
					{events
						.filter((el, i, arr) => arr.findIndex(ev => ev.eventTypeId === el.eventTypeId) === i)
						.map((el) => (
							<View
								style={{
									...styles.event,
									width: variant === 'normal' ? '33%' : '100%'
								}}
								key={el.id}
							>
								<View
									style={{
										...styles[`${variant}Dot`],
										backgroundColor: hashColor(el.eventTypeId.toString())
									}} />
								<Text
									style={{
										fontSize: variant === 'normal' ? 14 : 20
									}}
								>{eventTypeMap[el.eventTypeId]?.eventType || ''}</Text>
							</View>
						))}
				</View>
			</Card>
		)
	}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		flexWrap: 'wrap'
	},
	event: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	bigDot: {
		width: 20,
		height: 20,
		borderRadius: 20,
		marginRight: 5
	},
	normalDot: {
		width: 10,
		height: 10,
		borderRadius: 10,
		marginRight: 5
	}
})