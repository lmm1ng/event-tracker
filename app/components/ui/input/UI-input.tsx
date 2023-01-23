import { Text } from '@/components/ui/text/Text'
import { THEME } from '@/theme/theme'
import AntDesign from '@expo/vector-icons/AntDesign'
import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'

interface IUIInputProps extends TextInputProps {
	placeholder?: string
	label?: string
	password?: boolean
	icon?: string
}

export const UIInput: FC<IUIInputProps> = ({
	placeholder = '',
	label = '',
	password = false,
	value,
	onChangeText,
	icon = '',
	style: outerStyles
}) => {
	return (
		<View style={[styles.wrapper, outerStyles]}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.inputWrapper}>
				{icon ? (
					<AntDesign
						// wrong types
						// @ts-ignore
						name={icon}
						size={THEME.fontSizeRegular}
						color={THEME.textColor}
						style={{ marginRight: 10 }}
					/>
				) : null}
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={THEME.placeholderColor}
					style={styles.input}
					secureTextEntry={password}
					value={value}
					onChangeText={text => (onChangeText ? onChangeText(text) : () => {})}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%'
	},
	label: {
		fontSize: 16,
		marginBottom: 4
	},
	inputWrapper: {
		flexDirection: 'row',
		backgroundColor: THEME.inputBackgroundColor,
		borderColor: THEME.inputBackgroundColor,
		borderWidth: 2,
		borderRadius: THEME.borderRadius,
		padding: 10,
		alignItems: 'center'
	},
	input: {
		color: THEME.textColor,
		backgroundColor: THEME.inputBackgroundColor,
		flex: 1
	}
})
