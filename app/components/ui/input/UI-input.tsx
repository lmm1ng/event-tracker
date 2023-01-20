import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { FC } from 'react'
import { StyleProp } from 'react-native'
import { TextStyle } from 'react-native'

interface IUIInputProps extends TextInputProps {
	width?: number,
	placeholder?: string,
	isPassword: boolean
	styles: StyleProp<TextStyle>
}

export const UIInput:
	FC<IUIInputProps> = (
	{
		width = 200,
		placeholder = '',
		styles: outerStyles,
		isPassword = false,
		value,
		onChangeText
	}) => {
	return (
		<TextInput
			placeholder={placeholder}
			style={[styles.input, { width }, outerStyles]}
			secureTextEntry={isPassword}
			value={value}
			onChangeText={text => onChangeText ? onChangeText(text) : () => {
			}}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: 'white',
		borderColor: '#E6E9ED',
		borderWidth: 2,
		borderRadius: 5,
		padding: 5
	}
})