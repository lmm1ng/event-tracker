import api from '@/api'
import { ILoginRequest } from '@/api/auth/auth.models'
import { AuthLayout } from '@/components/layouts/auth/AuthLayout'
import { UIButton } from '@/components/ui/button/UI-button'
import { UIInput } from '@/components/ui/input/UI-input'
import { AuthContext } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserContext } from '@/hooks/useUser'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

export const Login: FC = () => {
	const auth = useContext(AuthContext)
	const { setUser } = useContext(UserContext)

	useFocusEffect(
		useCallback(() => {
			if (auth.isAuth) {
				auth.logout()
			}
		}, [])
	)

	const [loginForm, setLoginForm] = useState<ILoginRequest>(() => ({
		username: '',
		password: ''
	}))

	const nav = useTypedNavigation()

	const login = () => {
		if (loginForm.username && loginForm.password) {
			api.auth.login(loginForm).then(res => {
				auth.login(res.data.session)
				setLoginForm({
					username: '',
					password: ''
				})
				nav.navigate('Home')
			})
		}
	}

	return (
		<AuthLayout>
			<View style={styles.wrapper}>
				<UIInput
					label='Login'
					value={loginForm.username}
					onChangeText={text =>
						setLoginForm(prev => ({ ...prev, username: text }))
					}
					style={{ marginBottom: 10 }}
				/>
				<UIInput
					label='Password'
					password
					value={loginForm.password}
					onChangeText={text =>
						setLoginForm(prev => ({ ...prev, password: text }))
					}
					style={{ marginBottom: 30 }}
				/>
				<UIButton
					text='Войти'
					onPress={() => login()}
				/>
			</View>
		</AuthLayout>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
