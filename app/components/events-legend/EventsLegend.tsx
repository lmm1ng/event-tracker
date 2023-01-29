import { UICard } from '@/components/ui/card/UI-card'
import { UIDot } from '@/components/ui/dot/UI-dot'
import { UILoader } from '@/components/ui/loader/UI-loader'
import { Text } from '@/components/ui/text/Text'
import { IEvent } from '@/models/event'
import { IEventType } from '@/models/eventType'
import { FC, useMemo } from 'react'
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native'

interface IEventsLegendProps extends ViewProps {
	events: IEvent[]
	eventTypes: IEventType[]
	isEventsLoading?: boolean
	isEventTypesLoading?: boolean
	variant?: 'normal' | 'big'
	showUniq?: boolean
	header?: boolean
}

export const EventsLegend: FC<IEventsLegendProps> = ({
	events,
	eventTypes,
	variant = 'normal',
	header = true,
	showUniq = false,
	isEventsLoading,
	isEventTypesLoading,
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
			<ScrollView>
				<View
					style={[
						styles.wrapper,
						{
							flexDirection: variant === 'normal' ? 'row' : 'column'
						}
					]}
				>
					{!(isEventsLoading || isEventTypesLoading) ? (
						<>
							{events.length ? (
								events
									.filter((el, i, arr) =>
										showUniq ? arr.findIndex(ev => ev.eventTypeId === el.eventTypeId) === i : el
									)
									.map(el => (
										<View
											style={{
												...styles.event,
												minWidth: variant === 'normal' ? '33%' : '100%'
											}}
											key={el.id}
										>
											<UIDot
												size={10}
												color={el.eventTypeColor}
												style={{ marginRight: 5 }}
											/>
											<Text
												style={{
													fontSize: variant === 'big' ? 20 : undefined
												}}
											>
												{eventTypeMap[el.eventTypeId]?.eventType || ''}
											</Text>
										</View>
									))
							) : (
								<View>
									<Text>No events</Text>
								</View>
							)}
						</>
					) : (
						<UILoader />
					)}
				</View>
			</ScrollView>
		</UICard>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flexWrap: 'wrap',
		width: '100%'
	},
	event: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})
