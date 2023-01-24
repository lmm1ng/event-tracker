import { Avatar } from '@/components/avatar/Avatar'
import { MainLayout } from '@/components/layouts/main/MainLayout'
import { UIButton } from '@/components/ui/button/UI-button'
import { UICard } from '@/components/ui/card/UI-card'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserContext } from '@/hooks/useUser'
import { FC, useContext } from 'react'
import { StyleSheet, View } from 'react-native'

export const Profile: FC = () => {
	const { user } = useContext(UserContext)
	const nav = useTypedNavigation()
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
						style={{ marginBottom: 20 }}
					/>
					<UIButton text='Settings' />
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
