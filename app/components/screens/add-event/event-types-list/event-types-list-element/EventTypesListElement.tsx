import { UICheckbox } from '@/components/ui/checkbox/UI-checkbox'
import { Text } from '@/components/ui/text/Text'
import { IEventType } from '@/models/eventType'
import { hashColor } from '@/utils/hash-color'
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
			<View
				style={[
					styles.dot,
					{ backgroundColor: hashColor(eventType.id.toString()) }
				]}
			/>
			<Text>{eventType.eventType}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	dot: {
		width: 10,
		height: 10,
		borderRadius: 10,
		marginRight: 5
	},
	checkbox: {
		marginRight: 10
	}
})
