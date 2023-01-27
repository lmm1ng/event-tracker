import { THEME } from '@/theme/theme'
import { FC } from 'react'
import { StyleProp, StyleSheet, TextProps, TextStyle } from 'react-native'
import { Text as NativeText } from 'react-native'

interface ITextProps extends TextProps {
	bold?: boolean
}

export const Text: FC<ITextProps> = ({
	bold = false,
	style: outerStyle = {},
	children,
	...props
}) => {
	return (
		<NativeText
			style={[styles.text, outerStyle]}
			{...props}
		>
			{children}
		</NativeText>
	)
}

const styles = StyleSheet.create({
	text: {
		fontSize: THEME.fontSizeRegular,
		color: THEME.textColor
	}
})
