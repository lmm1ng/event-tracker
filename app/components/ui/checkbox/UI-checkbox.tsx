import { Text } from '@/components/ui/text/Text'
import { THEME } from '@/theme/theme'
import AntDesign from '@expo/vector-icons/AntDesign'
import { FC } from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native'

interface IUICheckboxProps extends ViewProps {
	value: boolean
	onToggle: (value: boolean) => void
	label?: string
	style?: StyleProp<ViewStyle>
}

export const UICheckbox: FC<IUICheckboxProps> = ({
	value,
	onToggle,
	label = '',
	style: outerStyle
}) => {
	return (
		<Pressable
			onPress={() => onToggle(!value)}
			style={[styles.wrapper, outerStyle]}
		>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.checkbox}>
				{value ? (
					<AntDesign
						name='check'
						size={20}
						color={THEME.primaryColor}
					/>
				) : null}
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	label: {
		marginRight: 8
	},
	checkbox: {
		width: 25,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: THEME.textColor,
		borderRadius: 3
	}
})
