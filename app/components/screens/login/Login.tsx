import api from '@/api'
import { ILoginRequest } from '@/api/auth/auth.models'
import { UIButton } from '@/components/ui/button/UI-button'
import { UIInput } from '@/components/ui/input/UI-input'
import { Text } from '@/components/ui/text/Text'
import { AuthContext } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { THEME } from '@/theme/theme'
import { useFocusEffect } from '@react-navigation/native'
import { FC, useCallback, useContext, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

export const Login: FC = () => {
	const auth = useContext(AuthContext)

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

	const goToRegistration = () => {
		nav.navigate('Registration')
	}

	return (
		<View style={styles.wrapper}>
			<UIInput
				label='Login'
				value={loginForm.username}
				onChangeText={text => setLoginForm(prev => ({ ...prev, username: text }))}
				style={{ marginBottom: 10 }}
			/>
			<UIInput
				label='Password'
				password
				value={loginForm.password}
				onChangeText={text => setLoginForm(prev => ({ ...prev, password: text }))}
				style={{ marginBottom: 30 }}
			/>
			<UIButton
				text='Login'
				onPress={() => login()}
				style={{ marginBottom: 30 }}
			/>
			<Pressable
				style={{ alignSelf: 'flex-end' }}
				onPress={() => goToRegistration()}
			>
				<Text style={{ color: THEME.secondaryColor }}>Not registered yet?</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
