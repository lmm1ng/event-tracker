import { FC } from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'

export const AuthLayout: FC<ViewProps> = ({ children }) => {
	return <View style={styles.wrapper}>{children}</View>
}

const styles = StyleSheet.create({
	wrapper: {
		height: '100%'
	}
})
