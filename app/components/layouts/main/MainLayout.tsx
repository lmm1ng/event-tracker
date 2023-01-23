import { BottomMenu } from '@/components/layouts/main/bottom-menu/BottomMenu'
import { FC } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const MainLayout: FC<ViewProps> = ({ children }) => {
	const insets = useSafeAreaInsets()
	return (
		<View style={styles.wrapper}>
			<View
				style={[
					styles.content,
					{
						paddingTop: insets.top + 20,
						paddingBottom: insets.bottom + 20
					}
				]}
			>
				{children}
			</View>
			<BottomMenu />
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: '100%',
		display: 'flex'
	},
	content: {
		flex: 1,
		padding: 20
	}
})
