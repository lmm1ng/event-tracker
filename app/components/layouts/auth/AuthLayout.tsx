import { FC } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const AuthLayout: FC<ViewProps> = ({ children }) => {
	const insets = useSafeAreaInsets()
	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				...styles.wrapper
			}}
		>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		height: '100%',
		paddingHorizontal: 20
	}
})
