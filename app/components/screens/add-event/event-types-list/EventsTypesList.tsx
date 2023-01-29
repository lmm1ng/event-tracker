import { EventTypesListElement } from '@/components/screens/add-event/event-types-list/event-types-list-element/EventTypesListElement'
import { UICard } from '@/components/ui/card/UI-card'
import { Text } from '@/components/ui/text/Text'
import { IEventType } from '@/models/eventType'
import { FC } from 'react'
import { ScrollView, StyleSheet, ViewProps } from 'react-native'

interface IEventsTypesListProps extends ViewProps {
	types: IEventType[]
	checked: IEventType['id']
	setChecked: (eventTypeId: IEventType['id']) => void
}

export const EventsTypesList: FC<IEventsTypesListProps> = ({
	types,
	checked,
	setChecked,
	style: outerStyle
}) => {
	return (
		<UICard style={[{ paddingVertical: 20 }, outerStyle]}>
			<ScrollView>
				{types.length ? (
					types.map((type, id, arr) => (
						<EventTypesListElement
							eventType={type}
							checked={checked}
							setChecked={setChecked}
							style={[styles.listItem, id !== arr.length - 1 ? { marginBottom: 20 } : undefined]}
							key={type.id}
						/>
					))
				) : (
					<Text>No event types yet</Text>
				)}
			</ScrollView>
		</UICard>
	)
}

const styles = StyleSheet.create({
	listItem: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})
