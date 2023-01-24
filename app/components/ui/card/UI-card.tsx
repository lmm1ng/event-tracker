import { UIDivider } from '@/components/ui/divider/UI-divider'
import { Text } from '@/components/ui/text/Text'
import { THEME } from '@/theme/theme'
import { FC } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

interface ICardProps extends ViewProps {
	title?: string
	withDivider?: boolean
}

export const UICard: FC<ICardProps> = ({
	children,
	style: outerStyle,
	title = '',
	withDivider = true
}) => {
	return (
		<View style={[styles.wrapper, outerStyle]}>
			{title ? (
				<>
					<Text style={styles.title}>{title}</Text>
					{withDivider && <UIDivider />}
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
	title: {
		textAlign: 'center',
		fontSize: THEME.fontSizeHeader
	}
})
