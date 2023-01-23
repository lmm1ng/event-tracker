import { Text } from '@/components/ui/text/Text'
import { THEME } from '@/theme/theme'
import { FC } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

interface ICardProps extends ViewProps {
	title?: string
}

export const UICard: FC<ICardProps> = ({
	children,
	style: outerStyle,
	title = ''
}) => {
	return (
		<View style={[styles.wrapper, outerStyle]}>
			{title ? (
				<>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.divider} />
				</>
			) : null}
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		backgroundColor: THEME.inputBackgroundColor,
		borderRadius: THEME.borderRadius,
		padding: 10
	},
	divider: {
		width: '100%',
		height: 0.5,
		backgroundColor: THEME.textColor,
		marginTop: 5,
		marginBottom: 10
	},
	title: {
		textAlign: 'center',
		fontSize: THEME.fontSizeHeader
	}
})
