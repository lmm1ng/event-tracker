import { Avatar } from '@/components/avatar/Avatar'
import { MainLayout } from '@/components/layouts/main/MainLayout'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Button } from '@rneui/themed'
import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

export const Profile: FC = () => {
	const nav = useTypedNavigation()
	return (
		<MainLayout>
			<View style={styles.wrapper}>
				<Avatar size='big' />
				<View style={styles.buttons}>
					<Button
						style={styles.button}
						title='Friends'
						onPress={() => nav.navigate('Friends')}
					/>
					<Button
						style={styles.button}
						title='Events'
					/>
					<Button
						style={styles.button}
						title='Settings'
					/>
				</View>
			</View>
		</MainLayout>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttons: {
		marginTop: 50,
		display: 'flex',
		alignItems: 'center'
	},
	button: {
		marginBottom: 10,
		minWidth: '50%'
	}
})
