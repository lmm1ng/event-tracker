import { THEME } from '@/theme/theme'
import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

export const UIDivider: FC = () => {
	return <View style={styles.divider} />
}

const styles = StyleSheet.create({
	divider: {
		width: '100%',
		height: 0.5,
		backgroundColor: THEME.textColor,
		marginTop: 5,
		marginBottom: 10
	}
})
