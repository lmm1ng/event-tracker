import { FC, useCallback, useContext, useState } from 'react'
import { AuthLayout } from '@/components/layouts/auth/AuthLayout'
import { StyleSheet, Text, View } from 'react-native'
import { ILoginRequest } from '@/api/auth/auth.models'
import api from '@/api'
import { AuthContext } from '@/hooks/useAuth'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Input, Button } from '@rneui/themed'

export const Login: FC = () => {
	const auth = useContext(AuthContext)

	useFocusEffect(useCallback(() => {
		if (auth.isAuth) {
			auth.logout()
		}
	}, []))

	const [loginForm, setLoginForm] = useState<ILoginRequest>(() => ({
		username: '',
		password: ''
	}))

	const nav = useNavigation()

	const login = () => {
		if (loginForm.username && loginForm.password) {
			api.auth.login(loginForm)
				.then(async (res) => {
					auth.login(res.data.data.session)
					setLoginForm({
						username: '',
						password: ''
					})
					nav.navigate('MonthCalendar')
				})
		}
	}

	return (
		<AuthLayout>
			<View style={styles.wrapper}>
				<Input
					label='Login'
					value={loginForm.username}
					onChangeText={text => setLoginForm(prev => ({ ...prev, username: text }))}
				/>
				<Input
					label='Password'
					value={loginForm.password}
					secureTextEntry={true}
					onChangeText={text => setLoginForm(prev => ({ ...prev, password: text }))}
				/>
				<Button
					title='Войти'
					onPress={() => login()}
					containerStyle={{ width: '80%' }}
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