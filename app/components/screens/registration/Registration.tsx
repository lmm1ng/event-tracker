import api from '@/api'
import { IRegistrationRequest } from '@/api/auth/auth.models'
import { UIButton } from '@/components/ui/button/UI-button'
import { UIInput } from '@/components/ui/input/UI-input'
import { Text } from '@/components/ui/text/Text'
import { AuthContext } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { THEME } from '@/theme/theme'
import { raiseError } from '@/utils/toast'
import { FC, useContext, useState } from 'react'
import { Pressable, View } from 'react-native'
import { StyleSheet } from 'react-native'

export const Registration: FC = () => {
	const auth = useContext(AuthContext)
	const nav = useTypedNavigation()

	const [registrationForm, setRegistrationForm] = useState<
		IRegistrationRequest & { repeatPassword: string }
	>(() => ({
		username: '',
		password: '',
		repeatPassword: '',
		displayedName: ''
	}))

	const register = () => {
		if (Object.values(registrationForm).every(el => el !== '')) {
			if (registrationForm.password === registrationForm.repeatPassword) {
				const { repeatPassword, ...requestData } = registrationForm
				api.auth.register(requestData).then(res => {
					console.log(res)
					auth.login(res.data.session)
					setRegistrationForm({
						username: '',
						password: '',
						repeatPassword: '',
						displayedName: ''
					})
					nav.navigate('Home')
				})
			} else {
				raiseError({ message: 'Passwords are not equal' })
			}
		}
	}

	const goToLogin = () => {
		nav.navigate('Login')
	}

	return (
		<View style={styles.wrapper}>
			<UIInput
				label='Login'
				value={registrationForm.username}
				onChangeText={text =>
					setRegistrationForm(prev => ({ ...prev, username: text }))
				}
				style={{ marginBottom: 10 }}
			/>
			<UIInput
				label='Display name'
				value={registrationForm.displayedName}
				onChangeText={text =>
					setRegistrationForm(prev => ({ ...prev, displayedName: text }))
				}
				style={{ marginBottom: 10 }}
			/>
			<UIInput
				label='Password'
				password
				value={registrationForm.password}
				onChangeText={text =>
					setRegistrationForm(prev => ({ ...prev, password: text }))
				}
				style={{ marginBottom: 10 }}
			/>
			<UIInput
				label='Repeat password'
				password
				value={registrationForm.repeatPassword}
				onChangeText={text =>
					setRegistrationForm(prev => ({ ...prev, repeatPassword: text }))
				}
				style={{ marginBottom: 30 }}
			/>
			<UIButton
				text='Register'
				style={{ marginBottom: 30 }}
				onPress={() => register()}
			/>
			<Pressable style={{ alignSelf: 'flex-end' }}>
				<Text
					style={{ color: THEME.secondaryColor }}
					onPress={() => goToLogin()}
				>
					Already registered?
				</Text>
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
