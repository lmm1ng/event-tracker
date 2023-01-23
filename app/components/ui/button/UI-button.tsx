import { FC } from 'react'
import { ButtonProps, Pressable, StyleSheet, Text, View } from 'react-native'

interface IUIButtonProps {
	text: string
	variant?: 'primary' | 'secondary'
	size?: 'small' | 'medium' | 'big'
	width?: number
	onPress?: () => void
}

export const UIButton: FC<IUIButtonProps> = ({
	text,
	variant = 'primary',
	size = 'medium',
	width = 200,
	onPress = () => {}
}) => {
	return (
		<Pressable onPress={onPress}>
			<View style={[styles.button, styles[size], styles[variant], { width }]}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 30,
		height: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: 'white'
	},
	primary: {
		backgroundColor: '#04E39E'
	},
	secondary: {},
	small: {
		height: 30
	},
	medium: {
		height: 50
	},
	big: {
		height: 70
	},
	fullWidth: {
		width: '100%'
	}
})
