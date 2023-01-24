import { UICard } from '@/components/ui/card/UI-card'
import { Text } from '@/components/ui/text/Text'
import { IEvent } from '@/models/event'
import { IEventType } from '@/models/eventType'
import { hashColor } from '@/utils/hash-color'
import { FC, useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

interface IEventsLegendProps extends ViewProps {
	events: IEvent[]
	eventTypes: IEventType[]
	variant?: 'normal' | 'big'
	header?: boolean
}

export const EventsLegend: FC<IEventsLegendProps> = ({
	events,
	eventTypes,
	variant = 'normal',
	header = true,
	style: outerStyle
}) => {
	const eventTypeMap = useMemo(() => {
		return eventTypes.reduce((acc, cur) => {
			acc[cur.id] = cur
			return acc
		}, {} as Record<IEventType['id'], IEventType>)
	}, [eventTypes])

	return (
		<UICard
			title={header ? 'Events' : ''}
			style={outerStyle}
		>
			{events.length ? (
				<View
					style={{
						...styles.wrapper,
						flexDirection: variant === 'normal' ? 'row' : 'column'
					}}
				>
					{events
						.filter(
							(el, i, arr) =>
								arr.findIndex(ev => ev.eventTypeId === el.eventTypeId) === i
						)
						.map(el => (
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
									}}
								/>
								<Text
									style={{
										fontSize: variant === 'big' ? 20 : undefined
									}}
								>
									{eventTypeMap[el.eventTypeId]?.eventType || ''}
								</Text>
							</View>
						))}
				</View>
			) : (
				<Text>No events</Text>
			)}
		</UICard>
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
		width: 10,
		height: 10,
		borderRadius: 10,
		marginRight: 5
	},
	normalDot: {
		width: 10,
		height: 10,
		borderRadius: 10,
		marginRight: 5
	}
})
