import { CreateEventTypeModal } from '@/components/screens/add-event/create-event-type-modal/CreateEventTypeModal'
import { IEventType } from '@/models/eventType'
import { ListItemCheckBox } from '@rneui/base/dist/ListItem/ListItem.CheckBox'
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content'
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title'
import { Button, Card, ListItem } from '@rneui/themed'
import { FC, useEffect, useState } from 'react'

interface IEventsTypesListProps {
	types: IEventType[]
	checked: IEventType['id']
	setChecked: (eventTypeId: IEventType['id']) => void
}

export const EventsTypesList: FC<IEventsTypesListProps> = ({
	types,
	checked,
	setChecked
}) => {
	return (
		<Card>
			{types.map(type => (
				<ListItem key={type.id}>
					<ListItemCheckBox
						checked={checked === type.id}
						onPress={() => setChecked(type.id)}
					/>
					<ListItemContent>
						<ListItemTitle>{type.eventType}</ListItemTitle>
					</ListItemContent>
				</ListItem>
			))}
		</Card>
	)
}
