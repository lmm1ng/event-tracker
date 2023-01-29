import { BottomMenu } from '@/components/bottom-menu/BottomMenu'
import { AddEvent } from '@/components/screens/add-event/AddEvent'
import { Friends } from '@/components/screens/friends/Friends'
import { Home } from '@/components/screens/home/Home'
import { Login } from '@/components/screens/login/Login'
import { MonthCalendar } from '@/components/screens/month-calendar/MonthCalendar'
import { Profile } from '@/components/screens/profile/Profile'
import { Registration } from '@/components/screens/registration/Registration'
import { AuthContext } from '@/hooks/useAuth'
import { THEME } from '@/theme/theme'
import { navigationRef } from '@/utils/rootNavigation'
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export type RootRoutesParams = {
	Home: undefined
	MonthCalendar: undefined
	Login: undefined
	Registration: undefined
	AddEvent: {
		initialDate: Date
	}
	Profile: undefined
	Friends: undefined
}

const customTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: THEME.screenBackgroundColor
	}
}

const Stack = createNativeStackNavigator<RootRoutesParams>()

const routes = [
	<Stack.Screen
		name='Login'
		key='Login'
		component={Login}
		options={{ headerShown: false }}
	/>,
	<Stack.Screen
		name='Registration'
		key='Registration'
		component={Registration}
		options={{ headerShown: false }}
	/>
]
const protectedRoutes = [
	<Stack.Screen
		name='MonthCalendar'
		key='MonthCalendar'
		component={MonthCalendar}
		options={{ headerShown: false }}
	/>,
	<Stack.Screen
		name='Home'
		key='Home'
		component={Home}
		options={{ headerShown: false }}
	/>,
	<Stack.Screen
		name='AddEvent'
		key='AddEvent'
		component={AddEvent}
		initialParams={{ initialDate: new Date() }}
		options={{ headerShown: false }}
	/>,
	<Stack.Screen
		name='Profile'
		key='Profile'
		component={Profile}
		options={{ headerShown: false }}
	/>,
	<Stack.Screen
		name='Friends'
		key='Friends'
		component={Friends}
		options={{ headerShown: false }}
	/>
]

export const Entry = () => {
	const { isAuth } = useContext(AuthContext)
	const insets = useSafeAreaInsets()
	return (
		<View style={styles.layout}>
			<View
				style={[
					styles.content,
					{
						paddingTop: insets.top + 20,
						paddingBottom: insets.bottom + 20
					}
				]}
			>
				<NavigationContainer
					ref={navigationRef}
					theme={customTheme}
				>
					<Stack.Navigator>
						{isAuth ? (
							<Stack.Group screenOptions={{ animation: 'fade' }}>
								{protectedRoutes}
								{routes}
							</Stack.Group>
						) : (
							<Stack.Group>{routes}</Stack.Group>
						)}
					</Stack.Navigator>
				</NavigationContainer>
				<Toast />
			</View>
			{isAuth && <BottomMenu />}
		</View>
	)
}

const styles = StyleSheet.create({
	layout: {
		width: '100%',
		height: '100%',
		backgroundColor: THEME.screenBackgroundColor
	},
	content: {
		flex: 1,
		padding: 20
	}
})
