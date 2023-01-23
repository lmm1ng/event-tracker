import { Text } from '@/components/ui/text/Text'
import { THEME } from '@/theme/theme'
import { FC } from 'react'
import {
	StyleProp,
	StyleSheet,
	TouchableHighlight,
	View,
	ViewStyle
} from 'react-native'

interface IUIButtonProps {
	text: string
	variant?: 'primary' | 'secondary'
	onPress?: () => void
	disabled?: boolean
	style?: StyleProp<ViewStyle>
}

export const UIButton: FC<IUIButtonProps> = ({
	text,
	variant = 'primary',
	onPress = () => {},
	disabled = false,
	style: outerStyle
}) => {
	return (
		<TouchableHighlight
			onPress={onPress}
			style={[{ width: '100%' }, outerStyle]}
		>
			<View
				style={[
					styles.button,
					styles[variant],
					disabled && styles.primaryDisabled
				]}
			>
				<Text>{text}</Text>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	button: {
		width: '100%',
		borderRadius: THEME.borderRadius,
		height: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	primary: {
		backgroundColor: THEME.primaryColor
	},
	primaryDisabled: {
		backgroundColor: THEME.disabledTextColor
	},
	secondary: {
		borderColor: THEME.textColor,
		borderWidth: 2,
		backgroundColor: THEME.inputBackgroundColor
	}
})
