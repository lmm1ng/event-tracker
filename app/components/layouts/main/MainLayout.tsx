import { FC } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { BottomMenu } from '@/components/layouts/main/bottom-menu/BottomMenu'

export const MainLayout: FC<ViewProps> = ({ children }) => {
	return (
		<View style={styles.wrapper}>
			<View style={styles.content}>{children}</View>
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
		flex: 1
	}
})
