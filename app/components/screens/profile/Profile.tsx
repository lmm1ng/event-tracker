import { Avatar } from '@/components/avatar/Avatar'
import { MainLayout } from '@/components/layouts/main/MainLayout'
import { UIButton } from '@/components/ui/button/UI-button'
import { UICard } from '@/components/ui/card/UI-card'
import { AuthContext } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserContext } from '@/hooks/useUser'
import { FC, useContext } from 'react'
import { StyleSheet, View } from 'react-native'

export const Profile: FC = () => {
	const { user } = useContext(UserContext)
	const { logout } = useContext(AuthContext)
	const nav = useTypedNavigation()

	const makeLogout = () => {
		logout()
		nav.navigate('Login')
	}
	return (
		<MainLayout>
			<View style={styles.wrapper}>
				<Avatar
					user={user}
					size='big'
				/>
				<UICard style={[styles.buttons, { padding: 30 }]}>
					<UIButton
						text='Friends'
						style={{ marginBottom: 20 }}
						onPress={() => nav.navigate('Friends')}
					/>
					<UIButton
						text='Events'
						disabled
						style={{ marginBottom: 20 }}
					/>
					<UIButton
						text='Settings'
						disabled
						style={{ marginBottom: 50 }}
					/>
					<UIButton
						text='Logout'
						variant='secondary'
						onPress={() => makeLogout()}
					/>
				</UICard>
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
		marginTop: 50
	},
	button: {
		marginBottom: 10,
		minWidth: '50%'
	}
})
