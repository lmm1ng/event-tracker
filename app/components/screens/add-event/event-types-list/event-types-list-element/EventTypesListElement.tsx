import { UICheckbox } from '@/components/ui/checkbox/UI-checkbox'
import { UIDot } from '@/components/ui/dot/UI-dot'
import { Text } from '@/components/ui/text/Text'
import { IEventType } from '@/models/eventType'
import { FC } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

interface IEventTypesListElementProps extends ViewProps {
	eventType: IEventType
	checked: IEventType['id']
	setChecked: (id: IEventType['id']) => void
}

export const EventTypesListElement: FC<IEventTypesListElementProps> = ({
	eventType,
	checked,
	setChecked,
	style: outerStyle
}) => {
	return (
		<View style={[outerStyle]}>
			<UICheckbox
				value={checked === eventType.id}
				onToggle={() => setChecked(eventType.id)}
				style={styles.checkbox}
			/>
			<UIDot
				size={10}
				color={eventType.color}
				style={{ marginRight: 10 }}
			/>
			<Text>{eventType.eventType}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	checkbox: {
		marginRight: 10
	}
})
